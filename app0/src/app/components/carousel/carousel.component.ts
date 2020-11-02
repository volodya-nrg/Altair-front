import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    PLATFORM_ID,
    ViewChild
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked {
    private classNameDisabled = 'sx-disabled';
    private sideLeft: HTMLBaseElement[] = [];
    private sideCenter: HTMLBaseElement[] = [];
    private sideRight: HTMLBaseElement[] = [];
    private items: HTMLBaseElement[] = [];
    private animationTimeMS = 500;
    private isLoaded = false;
    @Input() isByOne = false;
    @ViewChild('btnLeft', {static: true}) btnLeft: ElementRef;
    @ViewChild('btnRight', {static: true}) btnRight: ElementRef;
    @ViewChild('row', {static: true}) row: ElementRef;
    @ViewChild('frame', {static: true}) frame: ElementRef;

    constructor(
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    ngAfterContentInit(): void {
    }

    // если изменится содержимое ng-content внутри карусели, то данный метод выполнится
    ngAfterContentChecked(): void {
        const tmpList = this.getItems();

        if (tmpList.length && !this.isLoaded) {
            this.isLoaded = true;
            this.items = tmpList;
            for (let i = 0, tmpW = 0; i < this.items.length; i++) {
                const el: HTMLBaseElement = this.items[i];
                tmpW += this.getTrueWidth(el.offsetWidth);

                if (tmpW <= this.frame.nativeElement.clientWidth) {
                    this.sideCenter.push(el); // наполняем центральную часть

                } else {
                    this.sideRight.push(el); // наполняем правую сторону
                }
            }

            this.render();
        }
    }

    getItems(): HTMLBaseElement[] {
        const list = this.row.nativeElement.querySelectorAll(':scope > .carousel_cell:not(.sx-empty)');
        return Array.from(list);
    }

    move({target}, toRight: boolean): void {
        if (target.classList.contains(this.classNameDisabled)) {
            return;
        }
        const receiver: HTMLBaseElement[] = [];

        if (toRight) {
            for (let i = 0, tmpW = 0; i < this.sideRight.length; i++) {
                const first = this.sideRight[i]; // div-блок
                tmpW += this.getTrueWidth(first.offsetWidth);

                if (tmpW <= this.frame.nativeElement.clientWidth) {
                    this.sideLeft.push(this.sideCenter.shift());
                    this.sideCenter.push(first);
                    continue;
                }

                receiver.push(first);
            }

        } else {
            for (let i = this.sideLeft.length - 1, tmpW = 0; i >= 0; i--) {
                const last = this.sideLeft[i]; // div-блок
                tmpW += this.getTrueWidth(last.offsetWidth);

                if (tmpW <= this.frame.nativeElement.clientWidth) {
                    this.sideCenter.unshift(last);
                    this.sideRight.unshift(this.sideCenter.pop());
                    continue;
                }

                receiver.unshift(last);
            }
        }

        toRight ? this.sideRight = receiver : this.sideLeft = receiver;

        this.render();
    }

    getTrueWidth(value: number): number {
        return this.isByOne ? this.frame.nativeElement.clientWidth : value;
    }

    seek(index: number): void {
        if (!this.items.length) {
            return;
        }

        const row: HTMLBaseElement = this.row.nativeElement;

        if (index > this.items.length - 1) {
            index = this.items.length - 1;
        }
        if (index < 0) {
            index = 0;
        }

        this.sideLeft.length = 0;
        this.sideCenter.length = 0;
        this.sideRight.length = 0;

        for (let i = 0, tmpW = 0; i < this.items.length; i++) {
            const el = this.items[i];

            if (i < index) {
                this.sideLeft.push(el);
                continue;
            }
            tmpW += this.getTrueWidth(el.offsetWidth);

            if (tmpW <= this.frame.nativeElement.clientWidth) {
                this.sideCenter.push(el);
            } else {
                this.sideRight.push(el);
            }
        }

        row.classList.remove('sx-transition');
        this.render();

        if (isPlatformBrowser(this.platformID)) {
            setTimeout(() => row.classList.add('sx-transition'), this.animationTimeMS);
        }
    }

    render(): void {
        let offset = 0;
        const btnLeft: HTMLBaseElement = this.btnLeft.nativeElement;
        const btnRight: HTMLBaseElement = this.btnRight.nativeElement;

        for (const el of this.sideLeft) {
            offset += this.getTrueWidth(el.offsetWidth);
        }

        this.row.nativeElement.style.transform = ('translateX(' + (-1 * offset).toString() + 'px)');

        if (btnLeft.classList.contains(this.classNameDisabled)) {
            btnLeft.classList.remove(this.classNameDisabled);
        }
        if (btnRight.classList.contains(this.classNameDisabled)) {
            btnRight.classList.remove(this.classNameDisabled);
        }
        if (!this.sideLeft.length) {
            btnLeft.classList.add(this.classNameDisabled);
        }
        if (!this.sideRight.length) {
            btnRight.classList.add(this.classNameDisabled);
        }
    }
}

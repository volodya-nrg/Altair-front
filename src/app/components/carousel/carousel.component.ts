import {
    AfterContentChecked,
    AfterContentInit,
    AfterViewInit,
    Component,
    ElementRef,
    Input,
    OnDestroy,
    OnInit,
    ViewChild
} from '@angular/core';

@Component({
    selector: 'app-carousel',
    templateUrl: './carousel.component.html',
    styleUrls: ['./carousel.component.less'],
})
export class CarouselComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit, AfterContentChecked {
    private classNameDisabled: string = 'sx-disabled';
    private sideLeft: HTMLBaseElement[] = [];
    private sideCenter: HTMLBaseElement[] = [];
    private sideRight: HTMLBaseElement[] = [];
    private items: HTMLBaseElement[] = [];
    private animationTimeMS: number = 500;
    @Input() isByOne: boolean = false;
    @ViewChild('btnLeft', {static: true}) btnLeft: ElementRef;
    @ViewChild('btnRight', {static: true}) btnRight: ElementRef;
    @ViewChild('row', {static: true}) row: ElementRef;
    @ViewChild('frame', {static: true}) frame: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    ngAfterContentInit(): void {
        // инициализировался content
    }

    ngAfterContentChecked(): void {
        if (!this.items.length) {
            this.items = this.getItems();

            if (this.items.length) {
                for (let i = 0, tmpW = 0; i < this.items.length; i++) {
                    let el: HTMLBaseElement = this.items[i];
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
    }

    getItems(): HTMLBaseElement[] {
        return Array.from(this.row.nativeElement.querySelectorAll(':scope > *'));
    }

    move({target}, toRight: boolean): void {
        if (target.classList.contains(this.classNameDisabled)) {
            return;
        }

        if (toRight) {
            let leftovers: HTMLBaseElement[] = [];
            for (let i = 0, tmpW = 0; i < this.sideRight.length; i++) {
                let first = this.sideRight[i]; // div-блок
                tmpW += this.getTrueWidth(first.offsetWidth);

                if (tmpW <= this.frame.nativeElement.clientWidth) {
                    this.sideLeft.push(this.sideCenter.shift());
                    this.sideCenter.push(first);
                    continue;
                }

                leftovers.push(first);
            }

            this.sideRight = leftovers;

        } else {
            let leftovers: HTMLBaseElement[] = [];
            for (let i = this.sideLeft.length - 1, tmpW = 0; i >= 0; i--) {
                let last = this.sideLeft[i]; // div-блок
                tmpW += this.getTrueWidth(last.offsetWidth);

                if (tmpW <= this.frame.nativeElement.clientWidth) {
                    this.sideCenter.unshift(last);
                    this.sideRight.unshift(this.sideCenter.pop());
                    continue;
                }

                leftovers.unshift(last);
            }

            this.sideLeft = leftovers;
        }

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
            let el = this.items[i];

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
        setTimeout(() => row.classList.add('sx-transition'), this.animationTimeMS);
    }

    render(): void {
        let offset: number = 0;
        const btnLeft: HTMLBaseElement = this.btnLeft.nativeElement;
        const btnRight: HTMLBaseElement = this.btnRight.nativeElement;

        for (let i = 0; i < this.sideLeft.length; i++) {
            offset += this.getTrueWidth(this.sideLeft[i].offsetWidth);
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

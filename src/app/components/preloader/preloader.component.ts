import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.less']
})
export class PreloaderComponent implements AfterViewInit {
    private _isVisible: boolean;
    @ViewChild('p', {static: true}) preloader: ElementRef;

    constructor() {
        this._isVisible = false;
    }

    ngAfterViewInit(): void {
    }

    getDOMrect(): DOMRect {
        return this.preloader.nativeElement.getBoundingClientRect();
    }

    isVisible(): boolean {
        return this._isVisible;
    }

    public hide(): void {
        this._isVisible = false;
    }

    public show(): void {
        this._isVisible = true;
    }

    toggle(): void {
        this._isVisible = !this._isVisible;
    }
}

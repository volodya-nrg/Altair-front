import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';

@Component({
    selector: 'app-preloader',
    templateUrl: './preloader.component.html',
    styleUrls: ['./preloader.component.less'],
})
export class PreloaderComponent implements OnInit, OnDestroy, AfterViewInit {
    @Input() height: number = 0;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
        this.preloader.nativeElement.style.height = this.height + 'em';
    }
}

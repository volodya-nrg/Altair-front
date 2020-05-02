import {AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class ModalComponent implements OnInit, OnDestroy, AfterViewInit {
    private isDisabled: boolean = true;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    ngAfterViewInit(): void {
    }

    isHidden(): boolean {
        return this.isDisabled;
    }

    show(): void {
        this.isDisabled = false;
    }

    hide(): void {
        this.isDisabled = true;
    }
}

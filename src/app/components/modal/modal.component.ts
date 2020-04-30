import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less']
})
export class ModalComponent implements OnInit, OnDestroy {
    private isShowModal: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }

    isActive(): boolean {
        return this.isShowModal;
    }

    show(): void {
        this.isShowModal = true;
    }

    hide(): void {
        this.isShowModal = false;
    }
}

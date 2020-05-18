import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Output() onClose: EventEmitter<boolean> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
        document.body.classList.add('sx-modal');
    }

    ngOnDestroy(): void {
        if (!document.body.querySelector('.modal')) {
            document.body.classList.remove('sx-modal');
        }
    }

    hide(): void {
        this.onClose.emit(true);
    }
}

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
        console.log('init modal');
        document.body.classList.add('sx-modal');
    }

    ngOnDestroy(): void {
        console.log('destroy modal');

        if (!document.body.querySelector('.modal')) {
            document.body.classList.remove('sx-modal');
        }
    }

    hide(): void {
        this.onClose.emit(true);
    }
}

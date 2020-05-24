import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() width: string;
    @Output() onClose: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private serviceAuth: AuthService,
    ) {
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
        this.serviceAuth.toggleModalAuth$.next(false);
    }
}

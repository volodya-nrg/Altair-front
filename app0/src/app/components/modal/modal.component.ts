import {Component, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.less'],
})
export class ModalComponent implements OnInit, OnDestroy {
    @Input() width: string;
    @Output() myClose: EventEmitter<boolean> = new EventEmitter();

    constructor(
        private serviceAuth: AuthService,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        if (isPlatformBrowser(this.platformID)) {
            document.body.classList.add('sx-modal');
        }
    }

    ngOnDestroy(): void {
        if (isPlatformBrowser(this.platformID) && !document.body.querySelector('.modal')) {
            document.body.classList.remove('sx-modal');
        }
    }

    hide(): void {
        this.myClose.emit(true);
        this.serviceAuth.toggleModalAuth$.next(false);
    }
}

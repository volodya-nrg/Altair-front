import {Component, Inject, OnDestroy, OnInit, PLATFORM_ID} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {Helpers} from './helpers';
import {environment} from '../environments/environment';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    showModalLogin = false;

    constructor(
        private serviceAuth: AuthService,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        const s = this.serviceAuth.toggleModalAuth$.subscribe(x => this.showModalLogin = x);
        this.subscriptions.push(s);

        if (isPlatformBrowser(this.platformID)) {
            Helpers.addScript(environment.ymapsPathScript);
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

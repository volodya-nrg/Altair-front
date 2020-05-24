import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from './services/auth.service';
import {Subscription} from 'rxjs';
import {Helpers} from './helpers';
import {environment} from '../environments/environment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    showModalLogin: boolean = false;

    constructor(
        private serviceAuth: AuthService,
    ) {
    }

    ngOnInit(): void {
        const s = this.serviceAuth.toggleModalAuth$.subscribe(x => this.showModalLogin = x);
        this.subscriptions.push(s);
        Helpers.addScript(environment.ymapsPathScript);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

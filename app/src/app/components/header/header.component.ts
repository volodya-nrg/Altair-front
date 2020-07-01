import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {UserExtInterface} from '../../interfaces/response/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    profile: UserExtInterface;
    isAdmin: boolean;

    constructor(
        private serviceAuth: AuthService,
    ) {
    }

    ngOnInit(): void {
        const s = this.serviceAuth.profile$.subscribe(x => {
            this.profile = x;
            this.isAdmin = this.serviceAuth.isAdmin();
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

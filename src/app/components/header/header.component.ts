import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {UserInterface} from '../../interfaces/response/user';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
})
export class HeaderComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    profile: UserInterface;
    isAdmin: boolean;

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        const s = this.authService.profile$.subscribe(x => {
            this.profile = x;
            this.isAdmin = this.authService.isAdmin();
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

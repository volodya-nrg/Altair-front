import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserInterface} from '../../../../interfaces/response/user';
import {AuthService} from '../../../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.less'],
})
export class PageProfileComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    profile: UserInterface;

    constructor(
        private serviceAuth: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    logout(): void {
        const s = this.serviceAuth.logout().subscribe(x => {
            localStorage.clear();
            this.serviceAuth.profile$.next(null);
            this.router.navigate(['/main']).then();
        });
        this.subscriptions.push(s);
    }
}
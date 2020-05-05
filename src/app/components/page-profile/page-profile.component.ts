import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {UserInterface} from '../../interfaces/response/user';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-page-profile',
    templateUrl: './page-profile.component.html',
    styleUrls: ['./page-profile.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageProfileComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    profile: UserInterface;

    constructor(
        private serviceAuth: AuthService,
        private router: Router,
    ) {
        // let id = this.route.snapshot.paramMap.get('id');
    }

    ngOnInit(): void {
        console.log('init PageProfile');
    }

    ngOnDestroy(): void {
        console.log('destroy PageProfile');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    logout(): void {
        const s = this.serviceAuth.logout().subscribe(
            _ => {
                localStorage.clear();
                this.serviceAuth.profileBhSubject.next(null);
                this.router.navigate(['/main']).then();
            },
            err => Helpers.handleErr(err),
            () => {
            }
        );
        this.subscriptions.push(s);
    }
}

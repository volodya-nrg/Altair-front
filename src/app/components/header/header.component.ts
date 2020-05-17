import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
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

    constructor(
        private authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        console.log('init headerComp');
        const s = this.authService.profileBhSubject.subscribe(x => this.profile = x);
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy headerComp');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

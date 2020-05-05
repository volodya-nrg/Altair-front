import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdFullInterface} from '../../../interfaces/response/ad';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Helpers} from '../../../helpers';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../../interfaces/response/user';

@Component({
    selector: 'app-page-profile-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.less']
})
export class PageProfileAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private profile: UserInterface;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private serviceUser: UserService,
        private serviceAuth: AuthService,
    ) {
    }

    ngOnInit(): void {
        console.log('init page profile ads');
        const s1 = this.serviceAuth.profileBhSubject.subscribe(x => {
            this.profile = x;

            if (!x) {
                return;
            }

            this.loadAds(this.profile.userId);
        });
        this.subscriptions.push(s1);
    }

    ngOnDestroy(): void {
        console.log('destroy page profile ads');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    loadAds(userId: number): void {
        const s = this.serviceUser.getUserAds(userId).subscribe(
            x => this.ads = x,
            err => Helpers.handleErr(err),
            () => {
            });
        this.subscriptions.push(s);
    }
}

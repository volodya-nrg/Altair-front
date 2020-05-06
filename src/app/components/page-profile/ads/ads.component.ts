import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {AdFullInterface} from '../../../interfaces/response/ad';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {Helpers} from '../../../helpers';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../../interfaces/response/user';

@Component({
    selector: 'app-page-profile-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageProfileAdsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private profile: UserInterface;
    private limit: number = 1;
    private offset: number = 0;
    private loadMoreForScroll: () => void;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;
    isLoadAll: boolean = false;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    constructor(
        private serviceUser: UserService,
        private serviceAuth: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.loadMoreForScroll = this.loadMore.bind(this);

        console.log('init page profile ads');
        const s1 = this.serviceAuth.profileBhSubject.subscribe(x => {
            this.profile = x;

            if (!x) {
                return;
            }

            this.send();
        });
        this.subscriptions.push(s1);
    }

    ngOnDestroy(): void {
        console.log('destroy page profile ads');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.removeScroll();
    }

    ngAfterViewInit(): void {
        this.addScroll();
    }

    addScroll(): void {
        window.addEventListener('scroll', this.loadMoreForScroll);
    }

    removeScroll(): void {
        window.removeEventListener('scroll', this.loadMoreForScroll);
    }

    send(): void {
        this.isLoading = true;
        const s = this.serviceUser.getUserAds(this.profile.userId, this.limit, this.offset).subscribe(
            x => {
                this.ads.push(...x);
                this.offset += this.limit;
                this.isLoading = false;

                if (x.length < this.limit) {
                    this.isLoadAll = true;

                } else {
                    this.loadMore();
                }
            },
            err => {
                this.isLoading = false;
                Helpers.handleErr(err);
            },
            () => {
                this.isLoading = false;
            });
        this.subscriptions.push(s);
    }

    loadMore(): void {
        console.log('scrolling Profile Ads');

        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && !this.isLoading && !this.isLoadAll) {
            this.send();
        }
    }
}

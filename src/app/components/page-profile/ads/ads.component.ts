import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdFullInterface} from '../../../interfaces/response/ad';
import {AuthService} from '../../../services/auth.service';
import {Helpers} from '../../../helpers';
import {Subscription} from 'rxjs';
import {UserInterface} from '../../../interfaces/response/user';
import {ProfileService} from '../../../services/profile.service';

@Component({
    selector: 'app-page-profile-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.less'],
})
export class PageProfileAdsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private profile: UserInterface;
    private limit: number = 3;
    private offset: number = 0;
    private loadMoreForScroll: () => void;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;
    isLoadAll: boolean = false;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    constructor(
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.loadMoreForScroll = this.loadMore.bind(this);

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
        const s = this.serviceProfile.getAds(this.limit, this.offset).subscribe(
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
        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && !this.isLoading && !this.isLoadAll) {
            this.send();
        }
    }
}

import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {AdFullInterface} from '../../../../../interfaces/response/ad';
import {AuthService} from '../../../../../services/auth.service';
import {UserExtInterface} from '../../../../../interfaces/response/user';
import {ProfileService} from '../../../../../services/profile.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-profile-ads',
    templateUrl: './ads.component.html',
    styleUrls: ['./ads.component.less'],
})
export class PageProfileAdsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private profile: UserExtInterface;
    private limit = 3;
    private offset = 0;
    private loadMoreForScroll: () => void;
    ads: AdFullInterface[] = [];
    isLoading = false;
    isLoadAll = false;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    constructor(
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.loadMoreForScroll = this.loadMore.bind(this);

        const s1 = this.serviceAuth.profile$.subscribe(x => {
            this.profile = x;

            // может прийти null. При этом отправку данных не делаем.
            if (!x) {
                return;
            }

            this.send();
        });
        this.subscriptions.push(s1);

        this.serviceTitle.setTitle('Профиль: объявления');
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

                if (x.length < this.limit) {
                    this.isLoadAll = true;
                    return;
                }

                this.loadMore();
            },
            err => this.isLoading = false,
            () => this.isLoading = false
        );
        this.subscriptions.push(s);
    }

    loadMore(): void {
        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        if (rect.top > window.innerHeight || this.isLoading || this.isLoadAll) {
            return;
        }

        this.send();
    }
}

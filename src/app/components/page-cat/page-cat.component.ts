import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {CatInterface} from '../../interfaces/response/cat';
import {SettingsInterface} from '../../interfaces/response/settings';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less']
})
export class PageCatComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catId: number = 0;
    private limit: number = 4;
    private offset: number = 0;
    private loadMoreForScroll: () => void;
    isLoadAll: boolean = false;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    constructor(
        private serviceAd: AdService,
        private serviceSettings: SettingsService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageCat');
    }

    ngOnDestroy(): void {
        console.log('destroy PageCat');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.removeScroll();
    }

    ngAfterViewInit(): void {
        let s = this.serviceSettings.settings.subscribe(
            x => this.start(x),
            err => Helpers.handleErr(err),
            () => {
            }
        );
        this.subscriptions.push(s);
        this.loadMoreForScroll = this.loadMore.bind(this);
        this.addScroll();
    }

    addScroll(): void {
        window.addEventListener('scroll', this.loadMoreForScroll);
    }

    removeScroll(): void {
        console.log('выключили скролл');
        window.removeEventListener('scroll', this.loadMoreForScroll);
    }

    start(settings: SettingsInterface): void {
        let s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log('смена роутинга, тут на странице');
                this.reset();
                this.start(settings);
            }
        });
        this.subscriptions.push(s);

        this.catId = Helpers.findCatIdFromSlugs(settings.catsTree.childes, this.route.snapshot.url);

        if (!this.catId && this.route.snapshot.url.length) {
            console.log('NOT FOUND');
            return;
        //
        // } else if (!this.catId) {
        //     console.log('PAGE /CAT');
        //     this.renderBC();
        //     return;
        }

        this.send();
    }

    send(): void {
        this.isLoading = true;
        let s = this.serviceAd.getFromCat(this.catId, this.limit, this.offset).subscribe(
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
            }
        );
        this.subscriptions.push(s);

        this.renderBC();
    }

    renderBC(): void {
        let cats: CatInterface[] = [];
        Helpers.getDescendantCatTree(this.serviceSettings.catsTree.childes, this.catId, cats, 0);
        this.serviceBreadcrumbs.bhSubject.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        console.log('scrolling');
        if (rect.top < window.innerHeight && !this.isLoading && !this.isLoadAll) {
            this.send();
        }
    }

    reset(): void {
        this.ads.length = 0;
        this.offset = 0;
        this.isLoading = false;
        this.isLoadAll = false;
    }
}

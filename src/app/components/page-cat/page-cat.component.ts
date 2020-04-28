import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {CatInterface} from '../../interfaces/response/cat';
import {SettingsInterface} from '../../interfaces/response/settings';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {PreloaderComponent} from '../preloader/preloader.component';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less']
})
export class PageCatComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catId: number;
    private limit: number = 8;
    private offset: number = 0;
    ads: AdFullInterface[] = [];
    loadMoreForScroll: () => void;
    @ViewChild(PreloaderComponent) preloader: PreloaderComponent;

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
        let s = this.serviceSettings.settings.subscribe(
            x => this.start(x),
            err => Helpers.handleErr(err),
            () => {
            }
        );
        this.subscriptions.push(s);
        this.loadMoreForScroll = this.loadMore.bind(this);
    }

    ngOnDestroy(): void {
        console.log('ngOnDestroy Cat');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.removeScroll();
    }

    ngAfterViewInit(): void {
        this.addScroll();
    }

    addScroll(): void {
        window.addEventListener('scroll', this.loadMoreForScroll, true);
    }

    removeScroll(): void {
        window.removeEventListener('scroll', this.loadMoreForScroll, true);
    }


    start(settings: SettingsInterface): void {
        let s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.ads.length = 0; // обнулим предыдущие данные
                this.offset = 0; // обнулим предыдущие данные
                this.catId = Helpers.findCatIdFromSlugs(settings.catsTree.childes, this.route.snapshot.url);
                this.send();
            }
        });
        this.subscriptions.push(s);

        this.catId = Helpers.findCatIdFromSlugs(settings.catsTree.childes, this.route.snapshot.url);

        if (!this.catId && this.route.snapshot.url.length) {
            console.log('NOT FOUND');
            return;

        } else if (!this.catId) {
            console.log('PAGE /CAT');
            this.renderBC();
            return;
        }

        this.send();
    }

    send(): void {
        this.preloader.show();
        let s = this.serviceAd.getFromCat(this.catId, this.limit, this.offset).subscribe(
            x => {
                this.ads.push(...x);
                this.offset += this.limit;
                this.preloader.hide();

                if (x.length < this.limit) {
                    this.removeScroll();

                } else {
                    this.loadMore();
                }
            },
            err => {
                this.preloader.hide();
                Helpers.handleErr(err);
            },
            () => {
                this.preloader.hide();
            }
        );
        this.subscriptions.push(s);

        this.renderBC();
    }

    renderBC(): void {
        let cats: CatInterface[] = [];
        Helpers.getDestidantCatTree(this.serviceSettings.catsTree.childes, this.catId, cats, 0);
        this.serviceBreadcrumbs.bhSubject.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
        console.log(1111);
        const rect: DOMRect = this.preloader.getDOMrect();

        if (rect.top < window.innerHeight) {
            this.send();
        }
    }
}

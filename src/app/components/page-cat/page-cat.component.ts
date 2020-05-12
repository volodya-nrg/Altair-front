import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {CatInterface, CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageCatComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscribeCats: Subscription;
    private subscriptions: Subscription[] = [];
    private catId: number = 0;
    private limit: number = 4;
    private offset: number = 0;
    private loadMoreForScroll: () => void;
    private masonry: ElementRef;
    isLoadAll: boolean = false;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;
    isPathRootCat: boolean = false;
    isPathNotFound: boolean = false;
    pointerOnCatTree: CatTreeInterface;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;
    @ViewChild('masonry') set content(content: ElementRef) {
        if (content) {
            this.masonry = content;
        }
    };

    constructor(
        private serviceAd: AdService,
        private serviceManager: ManagerService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageCat');

        this.loadMoreForScroll = this.loadMore.bind(this);

        const s = this.serviceManager.settings$.subscribe(
            x => {
                this.start(x.catsTree);
                this.pointerOnCatTree = x.catsTree;
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy PageCat');
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

    start(catsTree: CatTreeInterface): void {
        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                console.log('смена роутинга, тут на странице');
                this.reset();
                this.start(catsTree);
            }
        });
        this.subscriptions.push(s);

        this.catId = Helpers.findCatIdFromSlugs(catsTree.childes, this.route.snapshot.url);

        // если находимся в /cat
        if (this.catId === 0 && this.route.snapshot.url.length === 0) {
            this.reset();
            this.renderBC();
            this.isPathRootCat = true;
            setTimeout(() => Helpers.masonry(this.masonry.nativeElement, '.page-cat_brick'), 0);
            return;

            // есть какой-то урл (/cat/asd), но он не найден в структуре дерева
        } else if (this.catId === 0 && this.route.snapshot.url.length) {
            this.reset();
            this.isPathNotFound = true;
            return;
        }

        this.send();
    }

    send(): void {
        this.isLoading = true;
        this.subscribeCats = this.serviceAd.getFromCat(this.catId, this.limit, this.offset).subscribe(
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
                Helpers.handleErr(err.error);
            },
            () => {
                this.isLoading = false;
            }
        );
        this.subscriptions.push(this.subscribeCats);

        this.renderBC();
    }

    renderBC(): void {
        if (!this.pointerOnCatTree) {
            return;
        }

        let cats: CatInterface[] = [];
        Helpers.getDescendants(this.pointerOnCatTree.childes, this.catId, cats, 0);
        this.serviceBreadcrumbs.bhSubject.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
        console.log('scrolling');

        if (this.isPathNotFound || this.isPathRootCat) {
            return;
        }

        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && !this.isLoading && !this.isLoadAll) {
            this.send();
        }
    }

    reset(): void {
        this.ads.length = 0;
        this.offset = 0;
        this.isLoading = false;
        this.isLoadAll = false;
        this.isPathRootCat = false;
        this.isPathNotFound = false;

        if (this.subscribeCats) {
            this.subscribeCats.unsubscribe();
        }
    }
}

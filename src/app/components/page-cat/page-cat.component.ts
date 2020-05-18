import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {CatInterface, CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less'],
})
export class PageCatComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscribeCats: Subscription;
    private subscriptions: Subscription[] = [];
    private loadMoreForScroll: () => void;
    private masonry: ElementRef;
    private form: FormGroup;
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
        private fb: FormBuilder,
        private serviceAd: AdService,
        private serviceManager: ManagerService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
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

        this.form = this.fb.group({
            catId: [0, [Validators.required, Validators.min(0)]],
            limit: [10, [Validators.required, Validators.min(1)]],
            offset: [0, Validators.min(0)],
        });
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

    start(catsTree: CatTreeInterface): void {
        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.reset();
                this.start(catsTree);
            }
        });
        this.subscriptions.push(s);

        const catId = Helpers.findCatIdFromSlugs(catsTree.childes, this.route.snapshot.url);
        this.form.get('catId').setValue(catId);

        // если находимся в /cat
        if (catId < 1 && this.route.snapshot.url.length === 0) {
            this.reset();
            this.renderBC();
            this.isPathRootCat = true;
            setTimeout(() => Helpers.masonry(this.masonry.nativeElement, '.page-cat_brick'), 0);
            return;

            // есть какой-то урл (/cat/asd), но он не найден в структуре дерева
        } else if (catId < 1 && this.route.snapshot.url.length) {
            this.reset();
            this.isPathNotFound = true;
            return;
        }

        this.send();
    }

    send(): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        this.isLoading = true;
        this.subscribeCats = this.serviceAd.getFromCat(this.form.value).subscribe(
            x => {
                this.ads.push(...x);
                this.isLoading = false;
                let offset = this.form.get('offset').value;
                let limit = this.form.get('limit').value;

                this.form.get('offset').setValue(offset + limit);

                if (x.length < limit) {
                    this.isLoadAll = true;

                } else {
                    this.loadMore();
                }
            },
            err => {
                this.isLoading = false;
                Helpers.handleErr(err.error);
            },
            () => this.isLoading = false
        );
        this.subscriptions.push(this.subscribeCats);

        this.renderBC();
    }

    renderBC(): void {
        if (!this.pointerOnCatTree) {
            return;
        }

        let cats: CatInterface[] = [];

        Helpers.getDescendants(this.pointerOnCatTree.childes, this.form.get('catId').value, cats, 0);
        this.serviceBreadcrumbs.bhSubject.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
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
        this.isLoading = false;
        this.isLoadAll = false;
        this.isPathRootCat = false;
        this.isPathNotFound = false;
        this.form.get('offset').setValue(0);

        if (this.subscribeCats) {
            this.subscribeCats.unsubscribe();
        }
    }
}

import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
    private sSpecial: Subscription;
    private subscriptions: Subscription[] = [];
    private loadMoreForScroll: () => void;
    private masonry: ElementRef;
    private form: FormGroup;
    private defaultControls: Object = {};
    isLoadAll: boolean = false;
    ads: AdFullInterface[] = [];
    isLoading: boolean = false;
    isPathRootCat: boolean = false;
    isPathNotFound: boolean = false;
    catTree: CatTreeInterface;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    @ViewChild('masonry') set content(content: ElementRef) {
        if (!content) {
            return;
        }

        this.masonry = content;
    };

    constructor(
        private fb: FormBuilder,
        private serviceAd: AdService,
        private serviceManager: ManagerService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetection: ChangeDetectorRef,
    ) {
        this.defaultControls = {
            catId: [0, [Validators.required, Validators.min(0)]],
            limit: [10, [Validators.required, Validators.min(1)]],
            offset: [0, Validators.min(0)],
        };
    }

    ngOnInit(): void {
        this.loadMoreForScroll = this.loadMore.bind(this);
        this.form = this.fb.group(this.defaultControls);
        const s = this.serviceManager.settings$.subscribe(x => {
            this.catTree = x.catsTree; // перед стартом
            this.start();
        });
        this.subscriptions.push(s);
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

    start(): void {
        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.reset();
                this.start();
                s.unsubscribe(); // необходимо два
            }
        });
        this.subscriptions.push(s);

        const catId = Helpers.findCatIdFromSlugs(this.catTree.childes, this.route.snapshot.url);
        this.form.get('catId').setValue(catId);
        this.reset();

        // если находимся в /cat
        if (catId < 1 && this.route.snapshot.url.length === 0) {
            this.reset();
            this.renderBC();
            this.isPathRootCat = true;
            this.changeDetection.detectChanges();
            Helpers.masonry(this.masonry.nativeElement, '.page-cat_brick');
            return;

            // есть какой-то урл (/cat/asd), но он не найден в структуре дерева
        } else if (catId < 1 && this.route.snapshot.url.length) {
            this.reset();
            this.renderBC();
            this.isPathNotFound = true;
            return;
        }

        this.renderBC();
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
        this.sSpecial = this.serviceAd.getFromCat(this.form.value).subscribe(
            x => {
                this.ads.push(...x);
                this.isLoading = false;
                let offset = this.form.get('offset').value;
                let limit = this.form.get('limit').value;

                this.form.get('offset').setValue(offset + limit);

                if (x.length < limit) {
                    this.isLoadAll = true;
                    return;
                }

                this.loadMore();
            },
            err => this.isLoading = false,
            () => this.isLoading = false
        );
        this.subscriptions.push(this.sSpecial);
    }

    renderBC(): void {
        console.log(this.catTree);
        if (!this.catTree) {
            return;
        }

        let cats: CatInterface[] = [];
        const catId = this.form.get('catId').value;
        Helpers.getDescendants(this.catTree.childes, catId, cats, 0);

        this.serviceBreadcrumbs.sender$.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
        if (this.isPathNotFound || this.isPathRootCat) {
            return;
        }

        const rect: DOMRect = this.preloader.nativeElement.getBoundingClientRect();
        if (rect.top > window.innerHeight || this.isLoading || this.isLoadAll) {
            return;
        }

        this.send();
    }

    reset(): void {
        this.ads.length = 0;
        this.isLoading = false;
        this.isLoadAll = false;
        this.isPathRootCat = false;
        this.isPathNotFound = false;
        this.form.get('offset').setValue(0);

        if (this.sSpecial) {
            this.sSpecial.unsubscribe();
        }
    }
}

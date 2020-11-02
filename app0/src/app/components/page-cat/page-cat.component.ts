import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {CatInterface, CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isPlatformBrowser} from '@angular/common';
import {Title} from '@angular/platform-browser';

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
    isLoadAll = false;
    ads: AdFullInterface[] = [];
    isLoading = false;
    isPathRootCat = false;
    isPathNotFound = false;
    catTree: CatTreeInterface;
    @ViewChild('preloader', {static: true}) preloader: ElementRef;

    @ViewChild('masonry') set content(content: ElementRef) {
        if (!content) {
            return;
        }

        this.masonry = content;
    }

    constructor(
        private fb: FormBuilder,
        private serviceAd: AdService,
        private serviceManager: ManagerService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetection: ChangeDetectorRef,
        private serviceTitle: Title,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        this.loadMoreForScroll = this.loadMore.bind(this);
        this.form = this.fb.group({
            catID: [0, [Validators.required, Validators.min(0)]],
            limit: [10, [Validators.required, Validators.min(1)]],
            offset: [0, Validators.min(0)],
        });
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
        if (isPlatformBrowser(this.platformID)) {
            window.addEventListener('scroll', this.loadMoreForScroll);
        }
    }

    removeScroll(): void {
        if (isPlatformBrowser(this.platformID)) {
            window.removeEventListener('scroll', this.loadMoreForScroll);
        }
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

        const cat = Helpers.findCatFromSlugs(this.catTree.childes, this.route.snapshot.url);
        this.form.get('catID').setValue(cat && cat.catID || 0);
        this.reset();

        // если находимся в /cat
        if (!cat && this.route.snapshot.url.length === 0) {
            this.reset();
            this.renderBC();
            this.isPathRootCat = true;
            this.changeDetection.detectChanges();
            Helpers.masonry(this.masonry.nativeElement, '.page-cat_brick');
            this.serviceTitle.setTitle('Основные категории');
            return;

            // есть какой-то урл (/cat/asd), но он не найден в структуре дерева
        } else if (!cat && this.route.snapshot.url.length) {
            this.reset();
            this.renderBC();
            this.isPathNotFound = true;
            this.serviceTitle.setTitle('Не найдена категория');
            return;
        }

        this.serviceTitle.setTitle(cat.name);
        this.renderBC();
        this.send();
    }

    send(): void {
        if (this.form.invalid) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        this.isLoading = true;
        this.sSpecial = this.serviceAd.getFromCat(
            this.form.get('catID').value,
            this.form.get('limit').value,
            this.form.get('offset').value
        ).subscribe(
            x => {
                this.ads.push(...x);
                this.isLoading = false;
                const offset = this.form.get('offset').value;
                const limit = this.form.get('limit').value;

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
        if (!this.catTree) {
            return;
        }

        const cats: CatInterface[] = [];
        const catID = this.form.get('catID').value;
        Helpers.getDescendants(this.catTree.childes, catID, cats, 0);

        this.serviceBreadcrumbs.sender$.next(Helpers.buildBCFromCats(cats));
    }

    loadMore(): void {
        if (this.isPathNotFound || this.isPathRootCat) {
            return;
        }

        // this.changeDetection.detectChanges(); - не помогает

        if (typeof this.preloader.nativeElement === 'undefined') {
            console.error('undefined preloader');
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

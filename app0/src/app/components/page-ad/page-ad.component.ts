import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {PagesService} from '../../services/pages.service';
import {CatFullInterface, CatInterface, CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {ModalComponent} from '../modal/modal.component';
import {CarouselComponent} from '../carousel/carousel.component';
import {ManagerService} from '../../services/manager.service';
import {DomSanitizer, SafeResourceUrl, Title} from '@angular/platform-browser';
import {PhoneService} from '../../services/phone.service';
import {MyErrorService} from '../../services/my-error.service';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-page-ad',
    templateUrl: './page-ad.component.html',
    styleUrls: ['./page-ad.component.less'],
})
export class PageAdComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    adFull: AdFullInterface;
    catFull: CatFullInterface;
    adID: number;
    isLoading = false;
    isShowModalPhotos = false;
    youTubeLink: SafeResourceUrl;
    phoneNumber: string;
    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(CarouselComponent) carousel: CarouselComponent;

    constructor(
        private adService: AdService,
        private servicePages: PagesService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private serviceManager: ManagerService,
        private servicePhone: PhoneService,
        private serviceMyError: MyErrorService,
        private changeDetection: ChangeDetectorRef,
        private sanitizer: DomSanitizer,
        private route: ActivatedRoute,
        private serviceTitle: Title,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
        this.adID = this.getAdIDFromUrl();

        if (!this.adID) {
            if (isPlatformBrowser(this.platformID)) {
                alert('Ошибка: не верный ID объявления!');
            }
            return;
        }
    }

    ngOnInit(): void {
        const s = this.serviceManager.settings$.subscribe(x => this.start(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    start(catsTree: CatTreeInterface): void {
        this.isLoading = true;
        const s = this.servicePages.pageAd(this.adID).subscribe(
            x => {
                this.adFull = x.adFull;
                this.serviceTitle.setTitle(this.adFull.title);

                if (isPlatformBrowser(this.platformID) && this.adFull.youtube) {
                    const link = Helpers.youTubeLink(this.adFull.youtube);
                    this.youTubeLink = this.sanitizer.bypassSecurityTrustResourceUrl(link);
                }

                this.catFull = x.catFull;

                const cats: CatInterface[] = [];
                Helpers.getDescendants(catsTree.childes, this.adFull.catID, cats, 0);

                this.serviceBreadcrumbs.sender$.next(Helpers.buildBCFromCats(cats));
            },
            err => this.isLoading = false,
            () => this.isLoading = false
        );
        this.subscriptions.push(s);
    }

    showPhotos(indexPhoto: number): void {
        this.isShowModalPhotos = true;
        this.changeDetection.detectChanges();
        this.carousel.seek(indexPhoto);
    }

    showPhone({target}, phoneID: number): void {
        target.disabled = true;
        const s = this.servicePhone.getByID(phoneID).subscribe(
            x => this.phoneNumber = x.number,
            err => {
                this.serviceMyError.errors$.next({msg: err});
                target.disabled = false;
            },
            () => target.disabled = false
        );
        this.subscriptions.push(s);
    }

    getAdIDFromUrl(): number {
        let result = 0;
        const regexp = /.+_(\d+)$/;
        const res = this.route.snapshot.url[0].path.match(regexp);

        if (res && res.length > 1) {
            const adID = parseInt(res[1], 10);

            if (adID) {
                result = adID;
            }
        }

        return result;
    }
}

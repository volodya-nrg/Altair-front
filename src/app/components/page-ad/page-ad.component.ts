import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PagesService} from '../../services/pages.service';
import {CatFullInterface, CatInterface, CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';
import {ModalComponent} from '../modal/modal.component';
import {CarouselComponent} from '../carousel/carousel.component';
import {ManagerService} from '../../services/manager.service';

@Component({
    selector: 'app-page-ad',
    templateUrl: './page-ad.component.html',
    styleUrls: ['./page-ad.component.less'],
})
export class PageAdComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    adFull: AdFullInterface;
    catFull: CatFullInterface;
    url: string = environment.apiUrl;
    adId: number;
    isLoading: boolean = false;
    isShowModalPhotos: boolean = false;
    @ViewChild(ModalComponent) modal: ModalComponent;
    @ViewChild(CarouselComponent) carousel: CarouselComponent;

    constructor(
        private adService: AdService,
        private servicePages: PagesService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private serviceManager: ManagerService,
        private changeDetection: ChangeDetectorRef,
    ) {
        this.adId = Helpers.getAdIdFromUrl();

        if (!this.adId) {
            alert('Ошибка: не верный id объявления!');
            return;
        }
    }

    ngOnInit(): void {
        console.log('init pageAd');
        const s = this.serviceManager.settings$.subscribe(
            x => this.start(x.catsTree),
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    start(catsTree: CatTreeInterface): void {
        this.isLoading = true;
        const s = this.servicePages.pageAd(this.adId).subscribe(
            x => {
                this.adFull = x.adFull;
                this.catFull = x.catFull;

                let cats: CatInterface[] = [];
                Helpers.getDescendants(catsTree.childes, this.adFull.catId, cats, 0);

                const bcItems = Helpers.buildBCFromCats(cats);
                this.serviceBreadcrumbs.bhSubject.next(bcItems);
            },
            err => {
                this.isLoading = false;
                Helpers.handleErr(err.error);
            },
            () => {
                this.isLoading = false;
            }
        );
        this.subscriptions.push(s);
    }

    showPhotos(indexPhoto: number): void {
        this.isShowModalPhotos = true;
        this.changeDetection.detectChanges();
        this.carousel.seek(indexPhoto);
    }
}

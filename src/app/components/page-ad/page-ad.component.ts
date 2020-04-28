import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PagesService} from '../../services/pages.service';
import {CatFullInterface, CatInterface} from '../../interfaces/response/cat';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {SettingsService} from '../../services/settings.service';
import {SettingsInterface} from '../../interfaces/response/settings';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-page-ad',
    templateUrl: './page-ad.component.html',
    styleUrls: ['./page-ad.component.less']
})
export class PageAdComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    adFull: AdFullInterface;
    catFull: CatFullInterface;
    url: string = environment.apiUrl;
    adId: number;
    isLoading: boolean = false;

    constructor(
        private adService: AdService,
        private servicePages: PagesService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private settingsService: SettingsService,
    ) {
        this.adId = Helpers.getAdIdFromUrl();

        if (!this.adId) {
            alert('Ошибка: не верный id объявления!');
            return;
        }
    }

    ngOnInit(): void {
        console.log('init pageAd');
        let s = this.settingsService.settings.subscribe(
            x => this.start(x),
            err => Helpers.handleErr(err),
            () => {}
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(settings: SettingsInterface): void {
        this.isLoading = true;
        let s = this.servicePages.pageAd(this.adId).subscribe(
            x => {
                this.adFull = x.adFull;
                this.catFull = x.catFull;

                let cats: CatInterface[] = [];
                Helpers.getDestidantCatTree(settings.catsTree.childes, this.adFull.catId, cats, 0);

                const bcItems = Helpers.buildBCFromCats(cats);
                this.serviceBreadcrumbs.bhSubject.next(bcItems);
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
    }
}

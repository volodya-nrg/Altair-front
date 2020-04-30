import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';
import {Helpers} from '../../helpers';
import {PagesService} from '../../services/pages.service';
import {SettingsService} from '../../services/settings.service';
import {SettingsInterface} from '../../interfaces/response/settings';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';

@Component({
    selector: 'app-page-main',
    templateUrl: './page-main.component.html',
    styleUrls: ['./page-main.component.less'],
})
export class PageMainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    lastAdsFull: AdFullInterface[] = [];
    lastChainBC: BreadcrumbsInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private servicePages: PagesService,
        private settingsService: SettingsService,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageMain');

        const s = this.settingsService.settings.subscribe(
            x => {
                this.start(x);
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageMain');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(settings: SettingsInterface): void {
        this.isLoading = true;
        const s = this.servicePages.pageMain(4).subscribe(
            x => {
                this.lastAdsFull = x.last.adsFull;

                if (this.lastAdsFull.length) {
                    const needCatId = this.lastAdsFull[0].catId;
                    let listCat = Helpers.getAncestors(settings.catsTree.childes, needCatId);
                    this.lastChainBC = Helpers.buildBCFromCats(listCat);
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
        this.subscriptions.push(s);
    }
}

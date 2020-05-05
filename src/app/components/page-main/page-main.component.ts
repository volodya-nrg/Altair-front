import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';
import {Helpers} from '../../helpers';
import {PagesService} from '../../services/pages.service';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {ManagerService} from '../../services/manager.service';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-page-main',
    templateUrl: './page-main.component.html',
    styleUrls: ['./page-main.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageMainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    lastAdsFull: AdFullInterface[] = [];
    lastChainBC: BreadcrumbsInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private servicePages: PagesService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageMain');

        const s = this.serviceManager.catsTree.subscribe(
            x => this.start(x),
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

    start(catsTree: CatTreeInterface): void {
        this.isLoading = true;
        const s = this.servicePages.pageMain(10).subscribe(
            x => {
                this.lastAdsFull = x.last.adsFull;

                if (this.lastAdsFull.length) {
                    const needCatId = this.lastAdsFull[0].catId;
                    let listCat = Helpers.getAncestors(catsTree.childes, needCatId);
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

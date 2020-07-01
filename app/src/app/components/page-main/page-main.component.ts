import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';
import {Helpers} from '../../helpers';
import {PagesService} from '../../services/pages.service';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {ManagerService} from '../../services/manager.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-main',
    templateUrl: './page-main.component.html',
    styleUrls: ['./page-main.component.less'],
})
export class PageMainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catsTree: CatTreeInterface;
    lastAdsFull: AdFullInterface[] = [];
    lastChainBC: BreadcrumbsInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private servicePages: PagesService,
        private serviceManager: ManagerService,
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Altair - объявления в Узбекистане');
        const s = this.serviceManager.settings$.subscribe(x => {
            this.catsTree = x.catsTree;
            this.start();
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(): void {
        this.isLoading = true;
        const s = this.servicePages.pageMain(10).subscribe(
            x => {
                this.lastAdsFull = x.lastAdsFull;

                if (!this.lastAdsFull.length) {
                    return;
                }

                const needCatId = this.lastAdsFull[0].catId;
                let listCat = Helpers.getAncestors(this.catsTree.childes, needCatId);
                this.lastChainBC = Helpers.buildBCFromCats(listCat);

            },
            err => this.isLoading = false,
            () => this.isLoading = false
        );
        this.subscriptions.push(s);
    }
}

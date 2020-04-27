import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {CatInterface} from '../../interfaces/response/cat';
import {SettingsInterface} from '../../interfaces/response/settings';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less']
})
export class PageCatComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    ads: AdFullInterface[] = [];

    constructor(
        private serviceAd: AdService,
        private serviceSettings: SettingsService,
        private serviceBreadcrumbs: BreadcrumbsService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageCat');
        let s = this.serviceSettings.settings.subscribe(x => this.start(x));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageCat (' + this.subscriptions.length + ')');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(settings: SettingsInterface): void {
        let s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                const catId = Helpers.findCatIdFromSlugs(settings.catsTree.childes, this.route.snapshot.url);
                this.send(catId);
            }
        });
        this.subscriptions.push(s);

        const catId = Helpers.findCatIdFromSlugs(settings.catsTree.childes, this.route.snapshot.url);

        if (!catId && this.route.snapshot.url.length) {
            console.log('NOT FOUND');
            return;

        } else if (!catId) {
            console.log('PAGE /CAT');
            this.renderBC(catId);
            return;
        }

        this.send(catId);
    }

    send(catId: number): void {
        let s = this.serviceAd.getFromCat(catId).subscribe(x => {
            this.ads = x;
        });
        this.subscriptions.push(s);

        this.renderBC(catId);
    }

    renderBC(catId: number): void {
        let cats: CatInterface[] = [];
        Helpers.getDestidantCatTree(this.serviceSettings.catsTree.childes, catId, cats, 0);

        const bcItems = Helpers.buildBCFromCats(cats);
        this.serviceBreadcrumbs.bhSubject.next(bcItems);
    }
}

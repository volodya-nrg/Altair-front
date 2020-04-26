import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router, UrlSegment} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {SettingsService} from '../../services/settings.service';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less']
})
export class PageCatComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catSubject: BehaviorSubject<number>;
    ads: AdFullInterface[] = [];
    catId: number;

    constructor(
        private adService: AdService,
        private settingsService: SettingsService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageCat');

        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.catId = this.findCatIdFromSlugs(this.settingsService.catsTree.childes, this.route.snapshot.url);
                this.catSubject.next(this.catId);
            }
        });
        this.subscriptions.push(s);
        this.subscriptions.push(
            this.settingsService.settings.subscribe(x => this.start())
        );
    }

    ngOnDestroy(): void {
        console.log('destroy pageCat (' + this.subscriptions.length + ')');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(): void {
        this.catId = this.findCatIdFromSlugs(this.settingsService.catsTree.childes, this.route.snapshot.url);

        if (!this.catId && this.route.snapshot.url.length) {
            console.log('NOT FOUND');
            return;

        } else if (!this.catId) {
            console.log('PAGE /CAT');
            return;
        }

        this.catSubject = new BehaviorSubject<number>(this.catId);
        this.subscriptions.push(
            this.catSubject.subscribe(x => this.request(x))
        );
    }

    request(catId: number): void {
        this.subscriptions.push(
            this.adService.getFromCat(catId).subscribe(x => this.ads = x)
        );
    }

    findCatIdFromSlugs(catsTree: CatTreeInterface[], slugs: UrlSegment[]): number {
        let catId = 0;

        if (!slugs.length) {
            return catId;
        }

        for (let i = 0; i < catsTree.length; i++) {
            const cat = catsTree[i];

            // нашли то что искали
            if (cat.slug === slugs[0].path) {
                if (cat.slug === slugs[0].path && slugs.length === 1) {
                    return cat.catId;
                }
                if (cat.slug === slugs[0].path && slugs.length > 1 && cat.childes && cat.childes.length) {
                    return this.findCatIdFromSlugs(cat.childes, slugs.slice(1));
                }
            }
        }

        return catId;
    }
}

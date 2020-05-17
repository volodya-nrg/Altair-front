import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {Helpers} from '../../helpers';
import {SearchService} from '../../services/search.service';

@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.less'],
})
export class PageSearchComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    q: string;
    ads: AdInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private serviceAd: AdService,
        private serviceSearch: SearchService,
    ) {
    }

    ngOnInit(): void {
        console.log('init PageSearch');

        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.send();
            }
        });
        this.subscriptions.push(s);

        this.send();
    }

    ngOnDestroy(): void {
        console.log('destroy searchPage');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.serviceSearch.watchForReset.next(true);
    }

    send(): void {
        this.q = this.getQueryFromUrl();

        if (!this.q) {
            this.ads.length = 0;
            return;
        }

        this.isLoading = true;
        this.ads.length = 0;
        const s = this.serviceAd.getByQuery(this.q, 0).subscribe(
            x => {
                this.ads = x;
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

    getQueryFromUrl(): string {
        let q = this.route.snapshot.queryParams['q'] || '';
        return q.trim();
    }
}

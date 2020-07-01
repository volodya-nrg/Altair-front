import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {AdInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {Title} from '@angular/platform-browser';

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
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.send();
            }
        });
        this.subscriptions.push(s);

        this.serviceTitle.setTitle('Поиск');
        this.send();
    }

    ngOnDestroy(): void {
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
            x => this.ads = x,
            err => this.isLoading = false,
            () => this.isLoading = false
        );
        this.subscriptions.push(s);
    }

    getQueryFromUrl(): string {
        const q: string = this.route.snapshot.queryParams['q'] || '';
        return q.trim();
    }
}

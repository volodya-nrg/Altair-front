import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-page-search',
    templateUrl: './page-search.component.html',
    styleUrls: ['./page-search.component.less']
})
export class PageSearchComponent implements OnInit {
    private query: string;
    aAds = [1, 1, 1, 1, 1];

    constructor(
        private route: ActivatedRoute
    ) {
    }

    ngOnInit(): void {
        this.query = this.route.snapshot.queryParams['query'] || '';
        console.log('PageSearchComponent', this.query);
    }
}

import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-page-cat',
    templateUrl: './page-cat.component.html',
    styleUrls: ['./page-cat.component.less']
})
export class PageCatComponent implements OnInit {
    aAds = [1, 1, 1, 1, 1];

    constructor(
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        // this.route.snapshot.url
    }
}

import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-main',
    templateUrl: './page-main.component.html',
    styleUrls: ['./page-main.component.less'],
})
export class PageMainComponent implements OnInit {
    aAds = [1, 1, 1, 1, 1];

    constructor() {
    }

    ngOnInit(): void {
    }

}

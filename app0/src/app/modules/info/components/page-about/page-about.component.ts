import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-about',
    templateUrl: './page-about.component.html',
    styleUrls: ['./page-about.component.less']
})
export class PageAboutComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('О сайте');
    }
}

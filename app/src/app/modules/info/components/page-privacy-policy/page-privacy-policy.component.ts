import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-privacy-policy',
    templateUrl: './page-privacy-policy.component.html',
    styleUrls: ['./page-privacy-policy.component.less']
})
export class PagePrivacyPolicyComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }
    ngOnInit(): void {
        this.serviceTitle.setTitle('Политика обработки персональных данных');
    }
}

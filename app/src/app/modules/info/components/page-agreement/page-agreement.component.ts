import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-agreement',
    templateUrl: './page-agreement.component.html',
    styleUrls: ['./page-agreement.component.less']
})
export class PageAgreementComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Пользовательское соглашение');
    }
}

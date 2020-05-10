import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
    selector: 'app-page-agreement',
    templateUrl: './page-agreement.component.html',
    styleUrls: ['./page-agreement.component.less']
})
export class PageAgreementComponent implements OnInit {
    domain: string = environment.domain;

    constructor() {
    }

    ngOnInit(): void {
    }
}

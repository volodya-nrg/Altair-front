import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.less'],
})
export class PageLoginComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Авторизация');
    }
}

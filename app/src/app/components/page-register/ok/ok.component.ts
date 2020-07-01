import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-register-ok',
    templateUrl: './ok.component.html',
    styleUrls: ['./ok.component.less'],
})
export class PageRegisterOkComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Регистрация');
    }
}

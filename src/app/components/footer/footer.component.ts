import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.less']
})
export class FooterComponent implements OnInit {
    emailSupport: string = 'support@altair.uz';
    curYear: number = 2020;

    constructor() {
    }

    ngOnInit(): void {
    }
}

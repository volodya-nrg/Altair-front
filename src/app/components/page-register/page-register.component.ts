import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.less']
})
export class PageRegisterComponent implements OnInit {

    constructor() {
    }

    ngOnInit(): void {
        console.log(111);
    }
}

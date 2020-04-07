import {Component, Input, OnInit} from '@angular/core';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less']
})
export class AdComponent implements OnInit {
    @Input() viewOpt: string;

    constructor() {
    }

    ngOnInit(): void {
    }

}

import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less']
})
export class AdComponent implements OnInit, OnDestroy {
    url: string = environment.apiUrl;
    @Input() viewOpt: string;
    @Input() ad: AdFullInterface;

    constructor() {
    }

    ngOnInit(): void {
        console.log('init adComponent');
    }

    ngOnDestroy(): void {
        console.log('destroy adComponent');
    }
}

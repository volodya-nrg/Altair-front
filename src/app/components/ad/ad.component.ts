import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less'],
})
export class AdComponent implements OnInit, OnDestroy {
    url: string = environment.apiUrl;
    @Input() ad: AdFullInterface;
    @Input() viewOpt: string;
    @Input() inProfile: boolean = false;

    constructor() {
    }

    ngOnInit(): void {
        console.log('init adComponent');
    }

    ngOnDestroy(): void {
        console.log('destroy adComponent');
    }
}

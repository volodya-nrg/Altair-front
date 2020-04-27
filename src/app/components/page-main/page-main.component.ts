import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdService} from '../../services/ad.service';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-page-main',
    templateUrl: './page-main.component.html',
    styleUrls: ['./page-main.component.less'],
})
export class PageMainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    ads: AdFullInterface[] = [];

    constructor(
        private serviceAd: AdService
    ) {
    }

    ngOnInit(): void {
        console.log('init pageMain');
        let s = this.serviceAd.getFromCat(0).subscribe(x => this.ads = x);
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageMain');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

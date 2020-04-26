import {Component, OnInit} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AdService} from '../../services/ad.service';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {PagesService} from '../../services/pages.service';
import {CatFullInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-page-ad',
    templateUrl: './page-ad.component.html',
    styleUrls: ['./page-ad.component.less']
})
export class PageAdComponent implements OnInit {
    private subscription: Subscription;
    private subscriptions: Subscription[] = [];
    adFull: AdFullInterface;
    catFull: CatFullInterface;
    url: string = environment.apiUrl;
    adId: number;

    constructor(
        private adService: AdService,
        private pagesService: PagesService,
    ) {
        this.adId = this.getAdIdFromUrl();

        if (!this.adId) {
            alert('Ошибка: не верный id объявления!');
            return;
        }
    }

    ngOnInit(): void {
        console.log('init pageAd');

        this.subscription = this.pagesService.pageAd(this.adId).subscribe(x => {
            this.adFull = x.adFull;
            this.catFull = x.catFull;
        });
        this.subscriptions.push(this.subscription);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    getAdIdFromUrl(): number {
        let result = 0;
        const regexp = /_(\d+)$/;
        const a = document.createElement('a');
        a.href = window.location.href;

        let res = a.pathname.match(regexp);

        if (res && res.length && res.length > 1) {
            const adId = parseInt(res[1], 10);

            if (adId) {
                result = adId;
            }
        }

        return result;
    }
}

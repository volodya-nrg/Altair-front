import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';

@Component({
    selector: 'app-ad',
    templateUrl: './ad.component.html',
    styleUrls: ['./ad.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class AdComponent implements OnInit, OnDestroy {
    url: string = environment.apiUrl;
    @Input() ad: AdFullInterface;
    @Input() viewOpt: string;
    @Input() inProfile: boolean = false;

    constructor(
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        console.log('init adComponent');
    }

    ngOnDestroy(): void {
        console.log('destroy adComponent');
    }

    // edit(): void {
    //     this.router.navigate(['/profile/edit/' + this.ad.adId]).then();
    // }
}

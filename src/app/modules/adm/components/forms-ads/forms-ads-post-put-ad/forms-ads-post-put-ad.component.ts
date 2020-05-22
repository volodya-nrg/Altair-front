import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {CatTreeInterface, CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropFullInterface} from '../../../../../interfaces/response/prop';
import {AdService} from '../../../../../services/ad.service';
import {ManagerService} from '../../../../../services/manager.service';
import {CatService} from '../../../../../services/cat.service';
import {AdFullInterface} from '../../../../../interfaces/response/ad';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-forms-ads-post-put-ad',
    templateUrl: './forms-ads-post-put-ad.component.html',
    styleUrls: ['./forms-ads-post-put-ad.component.less']
})
export class FormsAdsPostPutAdComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catsTree: CatTreeInterface;
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    private _editAd: AdFullInterface;
    form: FormGroup;
    formJSON: Object;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFullReserved: PropFullInterface[] = [];
    url: string = environment.apiUrl;
    @Output() json: EventEmitter<any> = new EventEmitter();

    set editAd(x: AdFullInterface) {
        this._editAd = x;
        this.form.patchValue(this._editAd);
        this.form.get('adId').setValidators([Validators.required, Validators.min(1)]);
    }

    get editAd(): AdFullInterface {
        return this._editAd;
    }

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
        private serviceCats: CatService,
    ) {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

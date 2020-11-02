import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {AdService} from '../../../../../services/ad.service';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-ads-get-ads',
    templateUrl: './forms-ads-get-ads.component.html',
    styleUrls: ['./forms-ads-get-ads.component.less'],
})
export class FormsAdsGetAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            catID: ['0', Validators.required],
            limit: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
            offset: [0, Validators.min(0)],
        });

        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        if (this.form.invalid) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceAds.getFromCat(
            this.form.get('catID').value,
            this.form.get('limit').value,
            this.form.get('offset').value
        ).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

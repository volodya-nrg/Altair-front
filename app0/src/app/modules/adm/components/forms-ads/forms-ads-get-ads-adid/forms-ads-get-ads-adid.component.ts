import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../../../services/ad.service';

@Component({
    selector: 'app-forms-ads-get-ads-adid',
    templateUrl: './forms-ads-get-ads-adid.component.html',
    styleUrls: ['./forms-ads-get-ads-adid.component.less'],
})
export class FormsAdsGetAdsAdIDComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            adID: [0, [Validators.required, Validators.min(1)]],
        });
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

        const s = this.serviceAds.getOne(this.form.get('adID').value).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

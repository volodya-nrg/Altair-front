import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {AdService} from '../../../services/ad.service';

@Component({
    selector: 'app-forms-ads-get-ads',
    templateUrl: './forms-ads-get-ads.component.html',
    styleUrls: ['./forms-ads-get-ads.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsAdsGetAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm ads');
        this.form = this.fb.group({
            catId: [0, [Validators.required, Validators.min(1)]],
            limit: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
            offset: 0,
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm ads');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catId: number = this.form.get('catId').value;
        const limit: number = this.form.get('limit').value;
        const offset: number = this.form.get('offset').value;

        const s = this.serviceAds.getFromCat(catId, limit, offset).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

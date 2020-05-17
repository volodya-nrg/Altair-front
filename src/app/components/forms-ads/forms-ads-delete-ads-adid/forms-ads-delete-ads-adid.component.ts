import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {AdService} from '../../../services/ad.service';

@Component({
    selector: 'app-forms-ads-delete-ads-adid',
    templateUrl: './forms-ads-delete-ads-adid.component.html',
    styleUrls: ['./forms-ads-delete-ads-adid.component.less'],
})
export class FormsAdsDeleteAdsAdidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm ads delete');

        this.form = this.fb.group({
            adId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm ads delete');
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

        const s = this.serviceAds.delete(this.form.get('adId').value).subscribe(
            x => {
                this.json.emit(x);
                this.form.reset();
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

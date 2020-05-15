import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {AdService} from '../../../services/ad.service';

@Component({
    selector: 'app-forms-ads-post-ads',
    templateUrl: './forms-ads-post-ads.component.html',
    styleUrls: ['./forms-ads-post-ads.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsAdsPostAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm ads post');

        this.form = this.fb.group({
            title: '',
            catId: 0,
            userId: 0,
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            isDisabled: false,
            isApproved: false,
            youtube: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            countryName: '',
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm ads post');
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

        const newFormData = Helpers.getNewFormData(this.form.value);
        const s = this.serviceAds.create(newFormData).subscribe(
            x => {
                this.json.emit(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        if (target.files.length) {
            this.form.markAsDirty();
        }
        this.form.patchValue({
            files: target.files
        });
    }
}

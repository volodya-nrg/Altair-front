import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {Helpers} from '../../../helpers';
import {AdService} from '../../../services/ad.service';

@Component({
    selector: 'app-forms-ads-put-ads-adid',
    templateUrl: './forms-ads-put-ads-adid.component.html',
    styleUrls: ['./forms-ads-put-ads-adid.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsAdsPutAdsAdidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGetAdsAdId: FormGroup;
    formPutAdsAdId: FormGroup;
    url: string = environment.apiUrl;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm ads put');

        this.formGetAdsAdId = this.fb.group({
            adId: [0, [Validators.required, Validators.min(1)]],
        });
        this.formPutAdsAdId = this.fb.group({
            adId: [0, [Validators.required, Validators.min(0)]],
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
            slug: '',
            ip: '',
            hasPhoto: false,
            createdAt: '',
            updatedAt: '',
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm ads put');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGet({target}): void {
        if (this.formGetAdsAdId.invalid) {
            for (let key in this.formGetAdsAdId.controls) {
                const formControl = this.formGetAdsAdId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceAds.getOne(this.formGetAdsAdId.get('adId').value).subscribe(
            x => {
                this.json.emit(x);
                this.formPut.nativeElement.classList.remove('hidden');
                this.formPutAdsAdId.patchValue(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    submitFormPut({target}): void {
        if (this.formPutAdsAdId.invalid) {
            for (let key in this.formPutAdsAdId.controls) {
                const formControl = this.formPutAdsAdId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const newFormData = Helpers.getNewFormData(this.formPutAdsAdId.value);
        const s = this.serviceAds.update(this.formPutAdsAdId.get('adId').value, newFormData).subscribe(
            x => {
                this.json.emit(x);
                target.reset();
                this.formPutAdsAdId.reset();
                this.formPutAdsAdId.patchValue(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        if (target.files.length) {
            this.formPutAdsAdId.markAsDirty();
        }
        this.formPutAdsAdId.patchValue({
            files: target.files
        });
    }

    removePhoto({target}): void {
        this.formPutAdsAdId.patchValue({
            avatar: '',
        });
    }
}

import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../../../../services/ad.service';
import {FormsAdsPostPutAdComponent} from '../forms-ads-post-put-ad/forms-ads-post-put-ad.component';

@Component({
    selector: 'app-forms-ads-put-ads-adid',
    templateUrl: './forms-ads-put-ads-adid.component.html',
    styleUrls: ['./forms-ads-put-ads-adid.component.less'],
})
export class FormsAdsPutAdsAdidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPostPutWrap', {static: true}) formPostPutWrap: ElementRef;
    @ViewChild(FormsAdsPostPutAdComponent) formPostPut: FormsAdsPostPutAdComponent;

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            adId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
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

        const s = this.serviceAds.getOne(this.form.get('adId').value).subscribe(x => {
            this.json.emit(x);
            this.formPostPutWrap.nativeElement.classList.remove('hidden');
            this.formPostPut.editAd = x;
        });
        this.subscriptions.push(s);
    }
}

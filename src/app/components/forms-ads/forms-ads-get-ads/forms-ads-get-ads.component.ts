import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {AdService} from '../../../services/ad.service';
import {CatWithDeepInterface} from '../../../interfaces/response/cat';
import {ManagerService} from '../../../services/manager.service';

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
        console.log('init adm ads');
        this.form = this.fb.group({
            catId: ['0', [Validators.required]],
            limit: [10, [Validators.required, Validators.min(1), Validators.max(100)]],
            offset: [0, Validators.min(0)],
        });

        const s = this.serviceManager.settings$.subscribe(
            x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree),
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
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

        const s = this.serviceAds.getFromCat(this.form.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

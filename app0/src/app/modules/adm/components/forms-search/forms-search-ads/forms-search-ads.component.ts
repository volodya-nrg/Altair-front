import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../../../helpers';
import {SearchService} from '../../../../../services/search.service';
import {ManagerService} from '../../../../../services/manager.service';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';

@Component({
    selector: 'app-forms-search-ads',
    templateUrl: './forms-search-ads.component.html',
    styleUrls: ['./forms-search-ads.component.less'],
})
export class FormsSearchAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceSearch: SearchService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            query: ['', [Validators.required, Validators.minLength(2)]],
            catID: ['0', [Validators.required]],
            limit: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
            offset: [0, [Validators.required, Validators.min(0)]],
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

        const query: string = this.form.get('query').value;
        const catID: string = this.form.get('catID').value;
        const limit: number = this.form.get('limit').value;
        const offset: number = this.form.get('offset').value;

        const s = this.serviceSearch.ads(query, catID, limit, offset).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

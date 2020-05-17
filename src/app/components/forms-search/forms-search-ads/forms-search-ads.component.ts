import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {SearchService} from '../../../services/search.service';
import {ManagerService} from '../../../services/manager.service';
import {CatWithDeepInterface} from '../../../interfaces/response/cat';

@Component({
    selector: 'app-forms-search-ads',
    templateUrl: './forms-search-ads.component.html',
    styleUrls: ['./forms-search-ads.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsSearchAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceSearch: SearchService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            query: ['', [Validators.required, Validators.minLength(2)]],
            catId: ['0', [Validators.required]],
            limit: [5, [Validators.required, Validators.min(1), Validators.max(10)]],
            offset: [0, [Validators.required, Validators.min(0)]],
        };
    }

    ngOnInit(): void {
        console.log('init adm search ads');

        this.form = this.fb.group(this.defaultControls);

        const s = this.serviceManager.settings$.subscribe(
            x => {
                this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree);
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy adm search ads');
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

        const query: string = this.form.get('query').value;
        const catId: string = this.form.get('catId').value;
        const limit: number = this.form.get('limit').value;
        const offset: number = this.form.get('offset').value;

        const s = this.serviceSearch.ads(query, catId, limit, offset).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {PagesService} from '../../../services/pages.service';

@Component({
    selector: 'app-forms-pages-ad-adid',
    templateUrl: './forms-pages-ad-adid.component.html',
    styleUrls: ['./forms-pages-ad-adid.component.less'],
})
export class FormsPagesAdAdidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private servicePages: PagesService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm pages ad adId');

        this.form = this.fb.group({
            adId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm pages ad adId');
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

        const s = this.servicePages.pageAd(this.form.get('adId').value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

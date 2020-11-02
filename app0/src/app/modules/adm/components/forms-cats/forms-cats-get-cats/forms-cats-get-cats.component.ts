import {Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatService} from '../../../../../services/cat.service';

@Component({
    selector: 'app-forms-cats-get-cats',
    templateUrl: './forms-cats-get-cats.component.html',
    styleUrls: ['./forms-cats-get-cats.component.less'],
})
export class FormsCatsGetCatsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formGetCats: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
    ) {
    }

    ngOnInit(): void {
        this.formGetCats = this.fb.group({
            asTree: false,
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetCats({target}): void {
        if (this.formGetCats.invalid) {
            for (const key of Object.keys(this.formGetCats.controls)) {
                const formControl = this.formGetCats.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const fn: any = this.formGetCats.get('asTree').value ? this.serviceCats.getTree() : this.serviceCats.getList();
        const s = fn.subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

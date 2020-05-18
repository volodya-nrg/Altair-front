import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {CatService} from '../../../services/cat.service';

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
        console.log('init adm cats');

        this.formGetCats = this.fb.group({
            asTree: false,
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm cats');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetCats({target}): void {
        if (this.formGetCats.invalid) {
            for (let key in this.formGetCats.controls) {
                const formControl = this.formGetCats.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        let fn: any;

        if (this.formGetCats.get('asTree').value) {
            fn = this.serviceCats.getTree();
        } else {
            fn = this.serviceCats.getList();
        }

        const s = fn.subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

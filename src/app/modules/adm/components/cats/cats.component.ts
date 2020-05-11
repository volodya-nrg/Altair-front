import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatService} from '../../../../services/cat.service';
import {Helpers} from '../../../../helpers';

@Component({
    selector: 'app-cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class CatsComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    formGetCats: FormGroup;
    formGetCatsCatId: FormGroup;
    formPostCats: FormGroup;
    formPutCatsCatId: FormGroup;
    formDeleteCatsCatId: FormGroup;
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
        this.formGetCatsCatId = this.fb.group({
            catId: 0,
            withPropsOnlyFiltered: false,
        });
        this.formPostCats = this.fb.group({
            name: '',
            parentId: 0,
            pos: 0,
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: '',
        });
        this.formPutCatsCatId = this.fb.group({
            catId: 0,
            name: '',
            slug: '',
            parentId: 0,
            pos: 0,
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: false,
            isDisabled: false,
        });
        this.formDeleteCatsCatId = this.fb.group({
            catId: 0,
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
            fn = this.serviceCats.getList();
        } else {
            fn = this.serviceCats.getTree();
        }

        const s = fn.subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    submitFormGetCatsCatId({target}): void {
        if (this.formGetCatsCatId.invalid) {
            for (let key in this.formGetCatsCatId.controls) {
                const formControl = this.formGetCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }
    }

    submitFormPostCats({target}): void {
        if (this.formPostCats.invalid) {
            for (let key in this.formPostCats.controls) {
                const formControl = this.formPostCats.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }
    }

    submitFormPutCatsCatId({target}): void {
        if (this.formPutCatsCatId.invalid) {
            for (let key in this.formPutCatsCatId.controls) {
                const formControl = this.formPutCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }
    }

    submitFormDeleteCatsCatId({target}): void {
        if (this.formDeleteCatsCatId.invalid) {
            for (let key in this.formDeleteCatsCatId.controls) {
                const formControl = this.formDeleteCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }
    }
}

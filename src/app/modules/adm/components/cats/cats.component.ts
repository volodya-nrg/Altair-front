import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CatService} from '../../../../services/cat.service';
import {Helpers} from '../../../../helpers';
import {CatWithDeepInterface} from '../../../../interfaces/response/cat';
import {ManagerService} from '../../../../services/manager.service';
import {SettingsInterface} from '../../../../interfaces/response/settings';
import {PropFullInterface} from '../../../../interfaces/response/prop';
import {BlockPropsComponent} from '../block-props/block-props.component';

@Component({
    selector: 'app-cats',
    templateUrl: './cats.component.html',
    styleUrls: ['./cats.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class CatsComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGetCats: FormGroup;
    formGetCatsCatId: FormGroup;
    formPostCats: FormGroup;
    formGetCatForPut: FormGroup;
    formPutCatsCatId: FormGroup;
    formDeleteCatsCatId: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFull: PropFullInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;
    @ViewChild(BlockPropsComponent) blockProps: BlockPropsComponent;

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
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
            parentId: '0',
            pos: 0,
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: false,
        });
        this.formGetCatForPut = this.fb.group({
            catId: 0,
        });
        this.formPutCatsCatId = this.fb.group({
            catId: 0,
            name: '',
            slug: '',
            parentId: '0',
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
        console.log('destroy adm cats');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
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

        const catId: number = this.formGetCatsCatId.get('catId').value;
        const isWithPropsOnlyFiltered: boolean = this.formGetCatsCatId.get('withPropsOnlyFiltered').value;
        const s = this.serviceCats.getCatId(catId, isWithPropsOnlyFiltered).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
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

        const s = this.serviceCats.post(this.formPostCats.value).subscribe(
            x => {
                this.json.emit(x);
                target.reset();
                this.formGetCatsCatId.reset();
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    submitFormGetCatDataForPut({target}): void {
        if (this.formGetCatForPut.invalid) {
            for (let key in this.formGetCatsCatId.controls) {
                const formControl = this.formGetCatsCatId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catId: number = this.formGetCatForPut.get('catId').value;
        const s = this.serviceCats.getCatId(catId, false).subscribe(
            x => {
                this.json.emit(x);
                this.formPut.nativeElement.classList.remove('hidden');
                this.propsFull = x.props;

                this.formPutCatsCatId.reset();
                this.formPutCatsCatId.patchValue(x);
                this.blockProps.setPropsFull(x.props);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
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

        const s = this.serviceCats.put(this.formPutCatsCatId.get('catId').value, this.formPutCatsCatId.value).subscribe(
            x => {
                this.json.emit(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
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

        const s = this.serviceCats.delete(this.formDeleteCatsCatId.get('catId').value).subscribe(
            x => {
                this.json.emit(x);
                target.reset();
                this.formGetCatsCatId.reset();
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

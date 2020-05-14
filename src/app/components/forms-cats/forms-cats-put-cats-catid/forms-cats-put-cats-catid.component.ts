import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {SettingsInterface} from '../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../interfaces/response/cat';
import {PropFullInterface, PropInterface} from '../../../interfaces/response/prop';
import {DynamicPropsComponent} from '../../dynamic-props/dynamic-props.component';
import {CatService} from '../../../services/cat.service';
import {ManagerService} from '../../../services/manager.service';
import {Helpers} from '../../../helpers';

@Component({
    selector: 'app-forms-cats-put-cats-catid',
    templateUrl: './forms-cats-put-cats-catid.component.html',
    styleUrls: ['./forms-cats-put-cats-catid.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsCatsPutCatsCatidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGetCatForPut: FormGroup;
    formPutCatsCatId: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFull: PropFullInterface[] = [];
    props: PropInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild(DynamicPropsComponent) dynamicProps: DynamicPropsComponent;
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm cats');

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
            props: this.fb.array(this.propsFull), // походу так
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
        console.log('destroy adm cats');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGetCatDataForPut({target}): void {
        if (this.formGetCatForPut.invalid) {
            for (let key in this.formGetCatForPut.controls) {
                const formControl = this.formGetCatForPut.get(key);

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
                    props: this.fb.array(this.propsFull), // походу так
                });
                this.formPutCatsCatId.patchValue(x);
                const tmpProps = this.formPutCatsCatId.get('props') as FormArray;
                x.props.forEach(tmpPropFull => tmpProps.push(this.fb.group(tmpPropFull)));
                this.dynamicProps.propsFormArray = tmpProps;
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
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

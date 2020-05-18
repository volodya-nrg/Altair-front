import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
})
export class FormsCatsPutCatsCatidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGet: FormGroup;
    formPut: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFull: PropFullInterface[] = [];
    props: PropInterface[] = [];
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild(DynamicPropsComponent) dynamicProps: DynamicPropsComponent;
    @ViewChild('formPutEl', {static: true}) formPutEl: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            catId: [0, [Validators.required, Validators.min(0)]],
            name: ['', [Validators.required, Validators.minLength(2)]],
            slug: '',
            parentId: [0, Validators.min(0)],
            pos: [0, Validators.min(0)],
            isDisabled: false,
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: false,
            props: [],
        };
    }

    ngOnInit(): void {
        console.log('init adm cats');

        this.formGet = this.fb.group({
            catId: 0,
        });

        this.formPut = this.fb.group(this.defaultControls);
        this.formPut.get('props').setValue(this.fb.array(this.propsFull));

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
        if (this.formGet.invalid) {
            for (let key in this.formGet.controls) {
                const formControl = this.formGet.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catId: number = this.formGet.get('catId').value;
        const s = this.serviceCats.getCatId(catId, false).subscribe(
            x => {
                this.json.emit(x);
                this.formPutEl.nativeElement.classList.remove('hidden');

                this.formPut = this.fb.group(this.defaultControls);
                this.formPut.get('props').setValue(this.fb.array(this.propsFull));

                this.formPut.patchValue(x);
                const tmpProps = this.formPut.get('props') as FormArray;
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
        if (this.formPut.invalid) {
            for (let key in this.formPut.controls) {
                const formControl = this.formPut.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.put(this.formPut.get('catId').value, this.formPut.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

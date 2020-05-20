import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsInterface} from '../../../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {PropInterface, PropsAssigned, PropsAssignedInterface} from '../../../../../interfaces/response/prop';
import {DynamicPropsComponent} from '../../dynamic-props/dynamic-props.component';
import {CatService} from '../../../../../services/cat.service';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';

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
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPutEl', {static: true}) formPutEl: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.formGet = this.fb.group({
            catId: 0,
        });
        this.formPut = this.fb.group({
            catId: [0, [Validators.required, Validators.min(1)]],
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
            propsAssigned: this.fb.array(<PropsAssignedInterface[]> []),
        });

        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
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
        const s = this.serviceCats.getCatId(catId, false).subscribe(x => {
            this.json.emit(x);
            this.formPutEl.nativeElement.classList.remove('hidden');

            this.formPut.reset();
            (this.formPut.get('propsAssigned') as FormArray).clear();
            this.formPut.patchValue(x);

            // преобразуем нормально в массивы св-ва и их значения
            const aProps = x.props.map(y => this.fb.group(new PropsAssigned(y)));
            this.formPut.setControl('propsAssigned', this.fb.array(aProps));
        });
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

        const s = this.serviceCats.put(this.formPut.get('catId').value, this.formPut.value)
            .subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

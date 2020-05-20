import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatTreeInterface, CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {PropFullInterface} from '../../../../../interfaces/response/prop';
import {AdService} from '../../../../../services/ad.service';
import {ManagerService} from '../../../../../services/manager.service';
import {CatService} from '../../../../../services/cat.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-ads-post-ads',
    templateUrl: './forms-ads-post-ads.component.html',
    styleUrls: ['./forms-ads-post-ads.component.less'],
})
export class FormsAdsPostAdsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catsTree: CatTreeInterface;
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    form: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFullReserved: PropFullInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
        private serviceCats: CatService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            title: '',
            catId: [0, [Validators.required, Validators.min(1)]],
            userId: [0, [Validators.min(0)]],
            description: ['', Validators.required],
            price: 0,
            isDisabled: false,
            youtube: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            countryName: '',
            propsAssigned: this.fb.array([]),
        });

        const s = this.serviceManager.settings$.subscribe(x => {
            this.catsTree = x.catsTree;
            this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree);
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
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

        const newFormData = Helpers.getNewFormData(this.form.value);
        const s = this.serviceAds.create(newFormData).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }

    onChangeCat(): void {
        const catId: number = parseInt(this.form.get('catId').value, 10);

        if (Helpers.isLeaf(this.catsTree.childes, catId) !== 1) {
            return;
        }

        const s = this.serviceCats.getCatId(catId, false).subscribe(x => {
            const aPropsFull = this.form.get('propsAssigned') as FormArray;

            aPropsFull.clear();

            x.props.forEach((y, i) => {
                const newPropsFullGroup = this.fb.group({});
                let defaultValue = (this.tagKindNumber.indexOf(y.kindPropName) !== -1) ? 0 : '';
                let aValidators = [];

                if (y.propIsRequire) {
                    aValidators.push(Validators.required);
                }

                if (y.kindPropName === 'checkbox') {
                    y.values.forEach((z, i) => {
                        newPropsFullGroup.addControl(y.name + '[' + i + ']', this.fb.control(z.propId, aValidators));
                    });

                } else {
                    newPropsFullGroup.addControl(y.name, this.fb.control(defaultValue, aValidators));
                }

                aPropsFull.push(newPropsFullGroup);
            });

            this.propsFullReserved = x.props; // сохраним чтоб после на него опираться
        });
        this.subscriptions.push(s);
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    addPhoto({target}): void {
        const tmp = this.form.get('propsAssigned') as FormArray;

        tmp.controls.forEach(x => {
            let y = x as FormGroup;

            if (y.contains('files')) {
                if (target.files.length) {
                    this.form.markAsDirty();
                    y.get('files').setValue(target.files);

                } else {
                    y.get('files').setValue(''); // null
                }
            }
        });
    }
}

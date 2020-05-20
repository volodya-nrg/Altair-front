import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
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
    propsFull: PropFullInterface[] = [];
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
        private serviceCats: CatService,
    ) {
        this.defaultControls = {
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
        };
    }

    ngOnInit(): void {
        this.form = this.fb.group(this.defaultControls);

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
            let tmpGroup = this.fb.group(this.defaultControls);

            tmpGroup.get('catId').setValue(this.form.get('catId').value);
            this.form = tmpGroup;

            x.props.forEach(y => {
                let defaultValue = (this.tagKindNumber.indexOf(y.kindPropName) !== -1) ? 0 : '';
                let aValidators = [];

                // если данное св-во обязательно, то подключим валидатор
                if (y.propIsRequire) {
                    aValidators.push(Validators.required);
                }

                if (y.kindPropName === 'checkbox') {
                    y.values.forEach((z, i) => {
                        this.form.addControl(y.name + '[' + i + ']', this.fb.control(z.propId, aValidators));
                    });

                } else {
                    this.form.addControl(y.name, this.fb.control(defaultValue, aValidators));
                }
            });

            this.propsFull = x.props;
        });
        this.subscriptions.push(s);
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);
    }
}
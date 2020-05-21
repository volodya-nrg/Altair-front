import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {CatTreeInterface, CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropFullInterface} from '../../../../../interfaces/response/prop';
import {AdService} from '../../../../../services/ad.service';
import {ManagerService} from '../../../../../services/manager.service';
import {CatService} from '../../../../../services/cat.service';
import {Helpers} from '../../../../../helpers';
import {AdFullInterface} from '../../../../../interfaces/response/ad';
import {environment} from '../../../../../../environments/environment';

@Component({
    selector: 'app-forms-ads-post-put-ad',
    templateUrl: './forms-ads-post-put-ad.component.html',
    styleUrls: ['./forms-ads-post-put-ad.component.less']
})
export class FormsAdsPostPutAdComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catsTree: CatTreeInterface;
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    private _editAd: AdFullInterface;
    form: FormGroup;
    formJSON: Object;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFullReserved: PropFullInterface[] = [];
    url: string = environment.apiUrl;
    @Output() json: EventEmitter<any> = new EventEmitter();

    set editAd(x: AdFullInterface) {
        this._editAd = x;
        this.form.patchValue(this._editAd);
        this.form.get('adId').setValidators([Validators.required, Validators.min(1)]);

        this.onChangeCat(() => {
            x.detailsExt.forEach(y => {
                if (this.form.contains('p' + y.propId)) {
                    let value: any = y.value;

                    if (y.kindPropName === 'photo') {
                        value = '';

                        if (x.images && x.images.length) { // images может и не быть
                            x.images.forEach((img, i) => {
                                this.form.addControl('filesAlreadyHas[' + i + ']', this.fb.control(img.filepath));
                            });
                        }
                    }

                    if (this.tagKindNumber.indexOf(y.kindPropName) !== -1) {
                        value = parseInt(value, 10);
                    }

                    this.form.get('p' + y.propId).setValue(value);
                }
            });
        });
    }

    get editAd(): AdFullInterface {
        return this._editAd;
    }

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
        private serviceCats: CatService,
    ) {
    }

    ngOnInit(): void {
        this.formJSON = {
            adId: 0,
            title: '',
            slug: '',
            catId: [0, [Validators.required, Validators.min(1)]],
            userId: [0, [Validators.min(0)]],
            description: ['', Validators.required],
            price: 0,
            isDisabled: false,
            isApproved: false,
            youtube: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            countryName: '',
            createdAt: '',
            updatedAt: '',
        };

        this.form = this.fb.group(this.formJSON);

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
            let totalOldFiles = 0;
            let hasError = false;

            for (let key in this.form.controls) {
                if (key.substr(0, 'filesAlreadyHas'.length) === 'filesAlreadyHas') {
                    totalOldFiles++;
                }
            }

            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if ((key === 'files' || key === 'p91') && totalOldFiles) {
                    continue;
                }
                if (formControl.status === 'INVALID') {
                    hasError = true;
                    console.log('INVALID:', key);
                }
            }

            if (hasError) {
                return;
            }
        }

        const newFormData = Helpers.getNewFormData(this.form.value);
        const fn = this._editAd ? this.serviceAds.update(this.form.get('adId').value, newFormData) : this.serviceAds.create(newFormData);
        const s = fn.subscribe(x => {
            this.json.emit(x);
        });
        this.subscriptions.push(s);
    }

    onChangeCat(cb: Function): void {
        const catId: number = parseInt(this.form.get('catId').value, 10);

        if (Helpers.isLeaf(this.catsTree.childes, catId) !== 1) {
            return;
        }

        const s = this.serviceCats.getCatId(catId, false).subscribe(x => {
            const newForm = this.fb.group(this.formJSON);

            // восстановим предыдущие значения
            for (let key in this.form.controls) {
                if (newForm.contains(key)) {
                    newForm.get(key).setValue(this.form.get(key).value);
                }
            }
            this.form = newForm;

            x.props.forEach((y, i) => {
                let defaultValue = (this.tagKindNumber.indexOf(y.kindPropName) !== -1) ? 0 : '';
                let aValidators = [];

                if (y.propIsRequire) {
                    aValidators.push(Validators.required);
                }

                if (y.kindPropName === 'checkbox') {
                    y.values.forEach((z, i) => {
                        this.form.addControl('p' + y.propId + '[' + i + ']', this.fb.control(z.propId, aValidators));
                    });

                } else {
                    if (y.kindPropName === 'photo') {
                        this.form.addControl('files', this.fb.control('', aValidators));
                    }

                    // у фото оставляем св-во, т.к. на беке будет проверка данного св-ва
                    this.form.addControl('p' + y.propId, this.fb.control(defaultValue, aValidators));
                }
            });

            this.propsFullReserved = x.props; // сохраним чтоб после на него опираться

            if (cb) {
                cb();
            }
        });

        this.subscriptions.push(s);
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);
    }

    removeImage({target}): void {
        let owner = target.parentNode;
        let grandFather = owner.parentElement;
        const index = [...grandFather.childNodes].indexOf(owner);
        this.form.removeControl('filesAlreadyHas[' + index + ']');

        owner.remove();

        if (!grandFather.querySelectorAll('.form_thumbnails_thumbnail').length) {
            // this.form.get('files').setValue(''); // нельзя пустой объект ставить, т.к. валидатор считает его не пустым
        }
    }
}

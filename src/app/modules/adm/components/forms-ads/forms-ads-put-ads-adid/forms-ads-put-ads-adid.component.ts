import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatTreeInterface, CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {environment} from '../../../../../../environments/environment';
import {PropFullInterface} from '../../../../../interfaces/response/prop';
import {AdFullInterface} from '../../../../../interfaces/response/ad';
import {AdService} from '../../../../../services/ad.service';
import {ManagerService} from '../../../../../services/manager.service';
import {CatService} from '../../../../../services/cat.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-ads-put-ads-adid',
    templateUrl: './forms-ads-put-ads-adid.component.html',
    styleUrls: ['./forms-ads-put-ads-adid.component.less'],
})
export class FormsAdsPutAdsAdidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catsTree: CatTreeInterface;
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    formGetAdsAdId: FormGroup;
    form: FormGroup;
    url: string = environment.apiUrl;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFull: PropFullInterface[] = [];
    defaultControls: Object = {};
    editAd: AdFullInterface;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceAds: AdService,
        private serviceManager: ManagerService,
        private serviceCats: CatService,
    ) {
        this.defaultControls = {
            adId: [0, [Validators.required, Validators.min(1)]],
            title: '',
            catId: [0, [Validators.required, Validators.min(1)]],
            userId: [0, Validators.min(0)],
            description: ['', Validators.required],
            price: [0, [Validators.required, Validators.min(0)]],
            isDisabled: false,
            isApproved: false,
            youtube: '',
            latitude: 0,
            longitude: 0,
            cityName: '',
            countryName: '',
            slug: '',
            ip: '',
            hasPhoto: false,
            createdAt: '',
            updatedAt: '',
        };
    }

    ngOnInit(): void {
        this.formGetAdsAdId = this.fb.group({
            adId: [658, [Validators.required, Validators.min(1)]],
        });
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

    ngAfterViewInit(): void {
    }

    submitFormGet({target}): void {
        if (this.formGetAdsAdId.invalid) {
            for (let key in this.formGetAdsAdId.controls) {
                const formControl = this.formGetAdsAdId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceAds.getOne(this.formGetAdsAdId.get('adId').value).subscribe(x => {
            // затереть предыдущее
            this.form = this.fb.group(this.defaultControls);
            this.editAd = null;

            this.json.emit(x);
            this.formPut.nativeElement.classList.remove('hidden');
            this.form.get('catId').setValue(x.catId);
            this.onChangeCat(() => {
                this.form.patchValue(x);

                if (x.images && x.images.length) { // images может и не быть
                    x.images.forEach((img, i) => {
                        this.form.addControl('filesAlreadyHas[' + i + ']', this.fb.control(img.filepath));
                    });
                }

                x.detailsExt.forEach(y => {
                    if (this.form.contains(y.propName)) {
                        this.form.get(y.propName).setValue(y.value);
                    }
                });

                this.editAd = x;
            });
        });
        this.subscriptions.push(s);
    }

    submitFormPut({target}): void {
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
        const s = this.serviceAds.update(this.form.get('adId').value, newFormData).subscribe(x => {
            this.json.emit(x);
            // target.reset();
            // this.form.reset();
            // this.form.patchValue(x);
        });
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    onChangeCat(cb: Function): void {
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

            if (cb) {
                cb();
            }
        });
        this.subscriptions.push(s);
    }

    removeImage({target}): void {
        let owner = target.parentNode;
        let grandFather = owner.parentElement;
        const index = [...grandFather.childNodes].indexOf(owner);
        this.form.removeControl('filesAlreadyHas[' + index + ']');

        owner.remove();

        if (!grandFather.querySelectorAll('.form_thumbnails_thumbnail').length) {
            this.form.get('files').setValue(null); // нельзя пустой объект ставить, т.к. валидатор считает его не пустым
        }
    }
}
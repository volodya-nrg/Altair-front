import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Observable, Subscription} from 'rxjs';
import {PropService} from '../../services/prop.service';
import {PropFullInterface} from '../../interfaces/response/prop';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {AuthService} from '../../services/auth.service';
import {environment} from '../../../environments/environment';
import {ProfileService} from '../../services/profile.service';

@Component({
    selector: 'app-page-ad-create-edit',
    templateUrl: './page-ad-create-edit.component.html',
    styleUrls: ['./page-ad-create-edit.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageAdCreateEditComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface;
    private previousTitleHelp: string;
    private attentionTextCreate: string = 'Объявление добавлено.\nОно появится после проверки модератора.\nСпасибо что вы с нами!';
    private attentionTextUpdate: string = 'Объявление отредактированно.\nОно появится после проверки модератора.\nСпасибо что вы с нами!';
    private tagKindNumber: string[] = ['checkbox', 'radio', 'select', 'input_number'];
    adId: number = 0;
    aCols: CatTreeInterface[] = []; // динамическая переменная
    form: FormGroup;
    defaultFormControls: {
        title: FormControl,
        catId: FormControl,
        description: FormControl,
        price: FormControl,
        youtube: FormControl,
        isDisabled: FormControl,
    };
    aDynamicPropsFull: PropFullInterface[] = [];
    leaf: CatTreeInterface; // выбранный на данный момент каталог-лист
    isLoadingProps: boolean = false;
    editAd: AdFullInterface;
    url: string = environment.apiUrl;
    isSendData: boolean = false;
    @ViewChild('catCols', {static: true}) catCols: ElementRef;
    @ViewChild('formTag', {static: true}) formTag: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCat: CatService,
        private serviceProp: PropService,
        private serviceAd: AdService,
        private serviceProfile: ProfileService,
        private managerSettings: ManagerService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceAuth: AuthService,
        private changeDetection: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageAdd');

        this.resetToDefault();

        const s1 = this.managerSettings.catsTree.subscribe(
            x => {
                this.catTree = x;
                this.aCols.push(x);
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s1);

        let sAdIdTmp: string = this.route.snapshot.paramMap.get('adId');

        if (sAdIdTmp) {
            let adIdTmp: number = parseInt(sAdIdTmp);

            if (!isNaN(adIdTmp)) {
                this.adId = adIdTmp;
            }
        }
    }

    ngOnDestroy(): void {
        console.log('destroy pageAdd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
        const s2 = this.serviceAuth.profileBhSubject.subscribe(x => {
            if (this.adId && x && this.catTree) {
                const s3 = this.serviceProfile.getAd(this.adId).subscribe(
                    x => {
                        this.editAd = x;
                        this.fastOpenCols(x.catId);
                    },
                    err => {
                        Helpers.handleErr(err);
                        s3.unsubscribe();
                    },
                    () => {
                        s3.unsubscribe();
                    }
                );
            }
        });
        this.subscriptions.push(s2);
    };

    showSubCat({target}, cat: CatTreeInterface): void {
        const curDeepLevel = this.getDeepLevel(cat.catId);
        const hasChildes = cat.childes && cat.childes.length;
        this.aCols.length = curDeepLevel + 1; // обрежим массив до нужного состояния

        // childes может быть null-ом
        if (hasChildes) {
            this.aCols.push(cat);
        }

        target.parentElement
            .querySelectorAll('.sx-active')
            .forEach(x => x.classList.remove('sx-active'));
        target.classList.add('sx-active');

        if (!hasChildes) {
            this.adId = 0;
            this.editAd = null; // сотрем если было что
            this.leaf = cat;
            this.loadParams();
        }
    }

    onSubmit({target}): void {
        if (this.form.invalid) {
            Object.keys(this.form.controls).forEach(key => {
                if (this.form.get(key).status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            });
            return;
        }

        const newFormData = Helpers.getNewFormData(this.form.value);
        let fnExec: Observable<AdFullInterface>;
        const isUpdate: boolean = this.form.contains('adId') && this.form.get('adId').value > 0;

        if (isUpdate) {
            fnExec = this.serviceAd.update(this.editAd.adId, newFormData);

        } else {
            fnExec = this.serviceAd.create(newFormData);
        }

        this.isSendData = true;
        const s = fnExec.subscribe(
            x => {
                target.reset(); // на всякий случай и нативную форму сбросим
                this.resetToDefault();
                alert(isUpdate ? this.attentionTextUpdate : this.attentionTextCreate);
            },
            err => {
                this.isSendData = false;
                Helpers.handleErr(err.error);
                s.unsubscribe();
            },
            () => {
                this.isSendData = false;
                s.unsubscribe();
            }
        );
    }

    addPhoto({target}): void {
        this.form.patchValue({
            files: target.files
        });
    }

    private fastOpenCols(catId: number): void {
        this.aCols.length = 0;
        let leaf: CatTreeInterface[] = []; // сосуд для найденной категории
        let aCats: CatTreeInterface[] = this.getArrayAncestorsCatTree(this.catTree, catId, leaf).reverse();
        let ids: number[] = [];

        aCats.forEach(cat => {
            this.aCols.push(cat);

            // на нулевом уровне catId=0
            if (cat.catId) {
                ids.push(cat.catId);
            }
        });

        ids.push(catId);

        this.changeDetection.detectChanges();

        ids.forEach(id => {
            this.catCols.nativeElement
                .querySelector('.page-ad-create-edit_cats_col_' + id)
                .classList.add('sx-active');
        });

        this.leaf = leaf.pop();
        leaf.length = 0;
        this.loadParams();
    }

    private loadParams(): void {
        if (this.leaf.childes && this.leaf.childes.length) {
            return;
        }

        // подтягиваем доп. параметры
        this.isLoadingProps = true;
        const s = this.serviceProp.getPropsFullForCat(this.leaf.catId).subscribe(
            x => this.successAnswerOnPropsFull(x),
            err => {
                this.isLoadingProps = false;
                Helpers.handleErr(err.error);
                s.unsubscribe();
            },
            () => {
                this.isLoadingProps = false;
                s.unsubscribe();
            }
        );
    }

    private successAnswerOnPropsFull(x: PropFullInterface[]): void {
        let cat: CatTreeInterface = this.leaf;
        let newFormGroup = this.fb.group({});
        const hasEditedAdProps = this.editAd && this.editAd.detailsExt.length > 0;

        // выставим св-ва. Если новое объявление и что-то указали, либо редактируемое.
        x.forEach(newProp => {
            let oldValue = (this.tagKindNumber.indexOf(newProp.kindPropName) !== -1) ? 0 : '';
            let aValidators = [];

            // если данное св-во обязательно, то подключим валидатор
            if (newProp.propIsRequire) {
                aValidators.push(Validators.required);
            }

            if (hasEditedAdProps) {
                this.editAd.detailsExt.forEach(prop => {
                    if (newProp.name !== prop.propName) {
                        return true;
                    }

                    if (this.tagKindNumber.indexOf(prop.kindPropName) !== -1) {
                        const tmp = parseInt(prop.value);

                        // если валидное число, то примем
                        if (!isNaN(tmp)) {
                            oldValue = tmp;
                        }
                        return true;
                    }

                    if (newProp.name === 'files' && this.editAd.images && this.editAd.images.length) { // images может и не быть
                        let images = new FormArray([]);
                        this.editAd.images.forEach(img => images.push(new FormControl(img.filepath)));
                        newFormGroup.addControl('filesAlreadyHas', images);
                    }

                    oldValue = prop.value;
                    return false; // уже нашли что нужно, можно выйти
                });

            } else {
                // посмотрим в текущих контролах введеные уже значения. Его и зафиксируем.
                Object.keys(this.form.controls).forEach(key => {
                    if (key === newProp.name) {
                        oldValue = this.form.get(key).value;
                        return false;
                    }
                });
            }

            newFormGroup.addControl(newProp.name, new FormControl(oldValue, aValidators));
        });

        // обновим значения те что по дефолку. Не теряем старые введенные значени.
        this.form.get('catId').setValue(cat.catId);

        if (this.editAd) {
            Object.keys(this.defaultFormControls).forEach(defKey => {
                Object.keys(this.editAd).forEach(curKey => {
                    if (defKey === curKey) {
                        this.form.get(defKey).setValue(this.editAd[curKey]);
                        newFormGroup.addControl(defKey, this.form.get(defKey)); // валидатор (нужный) тоже подставится
                        return false;
                    }
                });
            });

            newFormGroup.addControl('adId', new FormControl(this.editAd.adId, Validators.required));
            newFormGroup.addControl('userId', new FormControl(this.editAd.userId, Validators.required));

        } else {
            Object.keys(this.defaultFormControls).forEach(defKey => {
                Object.keys(this.form.controls).forEach(curKey => {
                    if (defKey === curKey) {
                        newFormGroup.addControl(defKey, this.form.controls[defKey]);
                        return false;
                    }
                });
            });
        }

        // если предыдущей заголовок был со вспомогательным текстом, то обновим заголовок
        if (this.previousTitleHelp) {
            let oldTitleValue = newFormGroup.controls.title.value;
            oldTitleValue = oldTitleValue.replace(new RegExp(this.previousTitleHelp, 'gi'), '');
            newFormGroup.controls.title.setValue(oldTitleValue.trim());
            this.previousTitleHelp = '';
        }

        // если есть вспомогательный текст, то вставим его
        if (cat.titleHelp) {
            let oldTitleValue = newFormGroup.controls.title.value;
            oldTitleValue = oldTitleValue.replace(new RegExp(cat.titleHelp, 'gi'), '');
            oldTitleValue = cat.titleHelp + ' ' + oldTitleValue.trim();
            newFormGroup.controls.title.setValue(oldTitleValue);
            this.previousTitleHelp = cat.titleHelp;
        }

        // сделаем не обязательным заголовок и скроем его
        if (cat.isAutogenerateTitle) {
            newFormGroup.controls.title.clearValidators();
        }

        this.form = newFormGroup;
        this.aDynamicPropsFull = x;
    }

    private getArrayAncestorsCatTree(catTree: CatTreeInterface, catId: number, receiverCat: CatTreeInterface[]): CatTreeInterface[] {
        let result: CatTreeInterface[] = [];

        for (let i = 0; i < catTree.childes.length; i++) {
            const cat = catTree.childes[i];

            if (cat.catId === catId) {
                result.push(catTree);
                receiverCat.push(Object.assign({}, cat));
                return result;
            }
            if (cat.childes && cat.childes.length) {
                result = this.getArrayAncestorsCatTree(cat, catId, receiverCat);

                if (result.length) {
                    result.push(catTree);
                    return result;
                }
            }
        }

        return result;
    }

    private getDeepLevel(catId: number): number {
        let result = 0;

        for (let i = 0; i < this.aCols.length; i++) {
            const col = this.aCols[i];
            result = i;

            for (let j = 0; j < col.childes.length; j++) {
                var cat = col.childes[j];

                if (cat.catId === catId) {
                    return result;
                }
            }
        }

        return result;
    }

    private resetActiveItems(): void {
        this.catCols.nativeElement
            .querySelectorAll('.sx-active')
            .forEach(x => x.classList.remove('sx-active'));
    }

    private resetToDefault(): void {
        this.adId = 0;
        this.previousTitleHelp = '';
        this.aCols.length = 0;
        this.aDynamicPropsFull.length = 0;
        this.leaf = null;
        this.editAd = null;
        this.isLoadingProps = false;

        this.defaultFormControls = {
            catId: new FormControl(0, Validators.required),
            title: new FormControl(''),
            description: new FormControl('', Validators.required),
            price: new FormControl(0),
            youtube: new FormControl(''),
            isDisabled: new FormControl(false),
        };
        this.form = this.fb.group(this.defaultFormControls);

        if (this.catTree) {
            this.resetActiveItems();
            this.aCols.push(this.catTree);
        }
    }

    removeImage({target}): void {
        let owner = target.parentNode;
        let x = this.form.get('filesAlreadyHas') as FormArray;
        const files = this.form.get('files');

        const index = [...owner.parentElement.childNodes].indexOf(owner);
        x.removeAt(index);
        owner.remove();

        if (!x.length && typeof files.value === 'string') {
            files.setValue({});
        }
    }
}

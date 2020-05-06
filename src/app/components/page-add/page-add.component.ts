import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Subscription} from 'rxjs';
import {PropService} from '../../services/prop.service';
import {PropFullInterface} from '../../interfaces/response/prop';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {UserService} from '../../services/user.service';
import {AuthService} from '../../services/auth.service';

@Component({
    selector: 'app-page-add',
    templateUrl: './page-add.component.html',
    styleUrls: ['./page-add.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageAddComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface;
    private previousTitleHelp: string;
    aCols: CatTreeInterface[] = []; // динамическая переменная
    form: FormGroup;
    defaultFormControls: {
        catId: FormControl,
        title: FormControl,
        description: FormControl,
        price: FormControl,
        youtube: FormControl,
    };
    aDynamicPropsFull: PropFullInterface[] = [];
    leaf: CatTreeInterface; // выбранный на данный момент каталог-лист
    isLoadingProps: boolean = false;
    editAd: AdFullInterface;
    @ViewChild('catCols', {static: true}) catCols: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCat: CatService,
        private serviceProp: PropService,
        private serviceAd: AdService,
        private serviceUser: UserService,
        private managerSettings: ManagerService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceAuth: AuthService,
        private changeDetection: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageAdd');
        this.reset();
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
    }

    ngOnDestroy(): void {
        console.log('destroy pageAdd');
        this.subscriptions.forEach(x => x.unsubscribe());
        this.editAd = null;
    }

    ngAfterViewInit(): void {
        const adId = this.getQueryAdId();
        const s2 = this.serviceAuth.profileBhSubject.subscribe(x => {
            if (x && adId && this.catTree) {
                this.serviceUser.getUserAdsAdId(x.userId, adId).subscribe(
                    x => {
                        this.editAd = x;
                        this.fastOpenCols(x.catId);
                    },
                    err => Helpers.handleErr(err),
                    () => {
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

        let items: HTMLBaseElement[] = Array.from(target.parentElement.querySelectorAll('.sx-active'));
        for (let item of items) {
            item.classList.remove('sx-active');
        }
        target.classList.add('sx-active');

        if (!hasChildes) {
            this.editAd = null; // сотрем если было что
            this.leaf = cat;
            this.loadParams(cat);
        }
    }

    getDeepLevel(catId: number): number {
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

    onSubmit({target}): void {
        // if (this.form.invalid) {
        //     for (let key in this.form.controls) {
        //         const formControl = this.form.get(key);
        //
        //         if (formControl.status === 'INVALID') {
        //             console.log('INVALID:', key);
        //         }
        //     }
        //     return;
        // }

        const newFormData = Helpers.getNewFormData(this.form.value);
        const s = this.serviceAd.create(newFormData).subscribe(
            x => {
                target.reset(); // на всякий случай и нативную форму сбросим
                this.reset();
                alert('Объявление добавлено.\nОно появится после проверки модератора.\nСпасибо что вы с нами!');
            },
            err => {
                Helpers.handleErr(err.error);
            },
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        this.form.patchValue({
            files: target.files
        });
    }

    resetActiveItems(): void {
        let items: HTMLBaseElement[] = Array.from(this.catCols.nativeElement.querySelectorAll('.sx-active'));

        for (let item of items) {
            item.classList.remove('sx-active');
        }
    }

    reset(): void {
        this.defaultFormControls = {
            catId: new FormControl('', Validators.required),
            title: new FormControl(''),
            description: new FormControl('', Validators.required),
            price: new FormControl(0),
            youtube: new FormControl(''),
        };
        this.form = this.fb.group(this.defaultFormControls);
        this.aDynamicPropsFull.length = 0;
        this.leaf = null;
        this.isLoadingProps = false;
        this.aCols.length = 0;

        if (this.catTree) {
            this.resetActiveItems();
            this.aCols.push(this.catTree);
        }
    }

    getQueryAdId(): number {
        let result: number = 0;
        let adId = this.route.snapshot.queryParams['adId'] || '';

        if (!adId) {
            return result;
        }

        adId = parseInt(adId);

        if (!adId) {
            return result;
        }
        if (typeof adId !== 'number') {
            return result;
        }

        result = Math.abs(adId);

        return result;
    }

    private fastOpenCols(catId: number): void {
        this.aCols.length = 0;
        let leaf: CatTreeInterface[] = []; // сосуд для найденной категории
        let aCats: CatTreeInterface[] = this.getArrayAncestorsCatTree(this.catTree, catId, leaf).reverse();
        let ids: number[] = [];

        for (let i = 0; i < aCats.length; i++) {
            const cat = aCats[i];
            this.aCols.push(cat);

            // на нулевом уровне catId=0
            if (cat.catId) {
                ids.push(cat.catId);
            }
        }
        ids.push(catId);

        this.changeDetection.detectChanges();

        for (let i = 0; i < ids.length; i++) {
            const id = ids[i];
            const el = this.catCols.nativeElement.querySelector('.page-add_cats_col_' + id);
            el.classList.add('sx-active');
        }

        this.leaf = leaf.pop();
        leaf.length = 0;
        this.loadParams(this.leaf);

        if (this.editAd) {
            // тут необходимо вставить данные в форму
        }
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

    private loadParams(cat: CatTreeInterface): void {
        if (cat.childes && cat.childes.length) {
            return;
        }

        // подтягиваем доп. параметры
        this.isLoadingProps = true;
        const s = this.serviceProp.getPropsFullForCat(cat.catId).subscribe(
            x => {
                let newFormGroup = this.fb.group({});

                for (let i = 0; i < x.length; i++) {
                    let newProp = x[i];
                    let oldValue = newProp.kindPropName === 'input_number' ? 0 : '';
                    let aValidators = [];

                    // если данное св-во обязательно, то подключим валидатор
                    if (newProp.propIsRequire) {
                        aValidators.push(Validators.required);
                    }

                    // посмотрим в текущих контролах введеные уже значения. Его и зафиксируем.
                    Object.keys(this.form.controls).forEach(key => {
                        if (key === newProp.name) {
                            oldValue = this.form.controls[key].value;
                            return false;
                        }
                    });

                    newFormGroup.addControl(newProp.name, new FormControl(oldValue, aValidators));
                }

                // обновим значения те что по дефолку. Не теряем старые введенные значени.
                this.form.controls.catId.setValue(cat.catId);
                for (let defKey in this.defaultFormControls) {
                    for (let curKey in this.form.controls) {
                        if (defKey === curKey) {
                            newFormGroup.addControl(defKey, this.form.controls[defKey]);
                            break;
                        }
                    }
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
            },
            err => {
                this.isLoadingProps = false;
                Helpers.handleErr(err.error);
            },
            () => {
                this.isLoadingProps = false;
            }
        );
        this.subscriptions.push(s);
    }
}

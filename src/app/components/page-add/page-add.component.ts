import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Subscription} from 'rxjs';
import {PropService} from '../../services/prop.service';
import {PropFullInterface} from '../../interfaces/response/prop';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';

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
    @ViewChild('catCols', {static: true}) catCols: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCat: CatService,
        private serviceProp: PropService,
        private serviceAd: AdService,
        private managerSettings: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init pageAdd');
        this.reset();
        const s = this.managerSettings.catsTree.subscribe(
            x => {
                this.catTree = x;
                this.aCols.push(x);
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAdd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    };

    showSubCat({target}, cat: CatTreeInterface): void {
        const curDeepLevel = this.getDeepLevel(cat.catId);
        const hasChildes = cat.childes && cat.childes.length;
        this.aCols.length = curDeepLevel + 1; // обрежим массив до нужного состояния

        // childes может быть null-ом
        if (hasChildes) {
            this.aCols.push(cat);
        }

        this.resetActiveItems();
        target.classList.add('sx-active');

        // если это ветка, то выходим
        if (hasChildes) {
            return;
        }

        // так же тут применяем и обновление тех или иных элементов для данной категории
        this.leaf = cat;

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
}

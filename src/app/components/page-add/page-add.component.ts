import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Subscription} from 'rxjs';
import {PropService} from '../../services/prop.service';
import {PropFullInterface} from '../../interfaces/response/prop';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Helpers} from '../../helpers';
import {SettingsService} from '../../services/settings.service';
import {SettingsInterface} from '../../interfaces/response/settings';

@Component({
    selector: 'app-page-add',
    templateUrl: './page-add.component.html',
    styleUrls: ['./page-add.component.less']
})
export class PageAddComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface;
    private previosTitleHelp: string;
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

    constructor(
        private fb: FormBuilder,
        private serviceCat: CatService,
        private serviceProp: PropService,
        private serviceAd: AdService,
        private serviceSettings: SettingsService,
    ) {
        this.defaultFormControls = {
            catId: new FormControl('', Validators.required),
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            youtube: new FormControl(''),
        };
    }

    ngOnInit(): void {
        console.log('init pageAdd');
        this.form = this.fb.group(this.defaultFormControls);
        let s = this.serviceSettings.settings.subscribe(x => this.start(x));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAdd');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(settings: SettingsInterface): void {
        this.catTree = settings.catsTree;
        this.aCols.push(this.catTree);
    }

    showSubCat({target}, cat: CatTreeInterface): void {
        const curDeepLevel = this.getDeepLevel(cat.catId);
        const hasChildes = cat.childes && cat.childes.length;
        this.aCols.length = curDeepLevel + 1; // обрежим массив до нужного состояния

        // childes может быть null-ом
        if (hasChildes) {
            this.aCols.push(cat);
        }

        for (let elem of target.parentNode.querySelectorAll('li.sx-active')) {
            elem.classList.remove('sx-active');
        }
        target.classList.add('sx-active');

        // если это ветка, то выходим
        if (hasChildes) {
            return;
        }

        // так же тут применяем и обновление тех или иных элементов для данной категории
        this.leaf = cat;

        // подтягиваем доп. параметры
        let s = this.serviceProp.getPropsFullForCat(cat.catId).subscribe(x => {
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
            if (this.previosTitleHelp) {
                let oldTitleValue = newFormGroup.controls.title.value;
                oldTitleValue = oldTitleValue.replace(new RegExp(this.previosTitleHelp, 'gi'), '');
                newFormGroup.controls.title.setValue(oldTitleValue.trim());
                this.previosTitleHelp = '';
            }

            // если есть вспомогательный текст, то вставим его
            if (cat.titleHelp) {
                let oldTitleValue = newFormGroup.controls.title.value;
                oldTitleValue = oldTitleValue.replace(new RegExp(cat.titleHelp, 'gi'), '');
                oldTitleValue = cat.titleHelp + ' ' + oldTitleValue.trim();
                newFormGroup.controls.title.setValue(oldTitleValue);
                this.previosTitleHelp = cat.titleHelp;
            }

            // сделаем не обязательным заголовок и скроем его
            if (cat.isAutogenerateTitle) {
                newFormGroup.controls.title.clearValidators();
            }

            this.form = newFormGroup;
            this.aDynamicPropsFull = x;
        });
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

    onSubmit({target}) {
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
        let s = this.serviceAd.create(newFormData).subscribe(x => {
            console.log(x);
            target.reset();
        });
        this.subscriptions.push(s);
    }

    addPhoto({target}) {
        this.form.patchValue({
            files: target.files
        });
    }
}

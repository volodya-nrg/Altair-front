import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Subscription} from 'rxjs';
import {PropertyService} from '../../services/property.service';
import {PropertyFullInterface} from '../../interfaces/response/property';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-page-add',
    templateUrl: './page-add.component.html',
    styleUrls: ['./page-add.component.less']
})
export class PageAddComponent implements OnInit, OnDestroy {
    private subscription1: Subscription;
    private subscription2: Subscription;
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface; // деревом со св-вами
    private previosTitleHelp: string;
    aCols: CatTreeInterface[] = []; // динамическая переменная
    form: FormGroup;
    defaultFormControls: {
        title: FormControl,
        description: FormControl,
        price: FormControl,
        youtube: FormControl,
    };
    aDynamicPropsFull: PropertyFullInterface[] = [];
    leaf: CatTreeInterface; // выбранный на данный момент каталог-лист

    constructor(
        private fb: FormBuilder,
        private catService: CatService,
        private propertyService: PropertyService
    ) {
        this.defaultFormControls = {
            title: new FormControl('', Validators.required),
            description: new FormControl('', Validators.required),
            price: new FormControl(0, Validators.required),
            youtube: new FormControl('', Validators.required),
        };
    }

    ngOnInit(): void {
        this.form = this.fb.group(this.defaultFormControls);

        this.subscription1 = this.catService.getTree().subscribe(x => {
            this.catTree = x;
            this.aCols.push(x);
        });
        this.subscriptions.push(this.subscription1);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
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

        if (!hasChildes) {
            // так же тут применяем и обновление тех или иных элементов для данной категории
            this.leaf = cat;

            // подтягиваем доп. параметры
            this.subscription2 = this.propertyService.getPropertiesFullForCat(cat.catId).subscribe(x => {
                let newFormGroup = this.fb.group({});

                for (let i = 0; i < x.length; i++) {
                    let newProp = x[i];
                    let oldValue = newProp.kindPropertyName === 'input_number' ? 0 : '';
                    let aValidators = [];

                    // если данне св-во обязательно, то подключим валидатор
                    if (newProp.propertyIsRequire) {
                        aValidators.push(Validators.required);
                    }

                    // посмотрим в текущих контролах введеные уже значения. Его зафиксируем.
                    Object.keys(this.form.controls).forEach(key => {
                        if (key === newProp.name) {
                            oldValue = this.form.controls[key].value;
                            return false;
                        }
                    });

                    newFormGroup.addControl(newProp.name, new FormControl(oldValue, aValidators));
                }

                // обновим значения те что по дефолку. Не теряем старые введенные значени.
                for (let defKey in this.defaultFormControls) {
                    for (let curkey in this.form.controls) {
                        if (defKey === curkey) {
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
            this.subscriptions.push(this.subscription2);
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

    onSubmit({target}) {
        if (this.form.invalid) {
            alert('Error: not valid form');
            return;
        }
        // this.subscription2 = this.commentsService.create(this.form.value).subscribe(x => {
        //     target.reset();
        //     this.subscription3 = this.notesService.getOne(this.noteId).subscribe(y => this.fullNoteWithLinkPostIds = y);
        // });
    }
}

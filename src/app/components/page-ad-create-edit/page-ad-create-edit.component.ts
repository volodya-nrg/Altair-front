import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Observable, Subscription} from 'rxjs';
import {PropService} from '../../services/prop.service';
import {PropFullInterface} from '../../interfaces/response/prop';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AdService} from '../../services/ad.service';
import {Helpers} from '../../helpers';
import {ManagerService} from '../../services/manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AdFullInterface} from '../../interfaces/response/ad';
import {environment} from '../../../environments/environment';
import {ProfileService} from '../../services/profile.service';
import {CatsHorizAccordionComponent} from '../cats-horiz-accordion/cats-horiz-accordion.component';
import {EmitCatsHorizAccordionInterface} from '../../interfaces/emit-cats-horiz-accordion';

@Component({
    selector: 'app-page-ad-create-edit',
    templateUrl: './page-ad-create-edit.component.html',
    styleUrls: ['./page-ad-create-edit.component.less'],
})
export class PageAdCreateEditComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private previousTitleHelp: string;
    private attentionTextCreate: string = 'Объявление добавлено.\nОтправленно на проверку.\nСпасибо что вы с нами!';
    private attentionTextUpdate: string = 'Объявление обновлено.\nОтправленно на проверку.\nСпасибо что вы с нами!';
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    private ymapsPathScript: string = `https://api-maps.yandex.ru/2.1/?apikey=${environment.ymapKey}&lang=ru_RU`;
    private ym: any;
    private map: any;
    private defaultCenterMap: number[] = [55.76, 37.64];
    adId: number = 0; // это через param приходит
    form: FormGroup;
    defaultControls: Object = {};
    aDynamicPropsFull: PropFullInterface[] = [];
    leaf: CatTreeInterface; // выбранный на данный момент каталог-лист
    isLoadingProps: boolean = false;
    editAd: AdFullInterface;
    url: string = environment.apiUrl;
    isSendData: boolean = false;
    idMap: string = 'map';
    youTubeLink: string = environment.youTubeExampleLink;
    @ViewChild('formTag', {static: true}) formTag: ElementRef;
    @ViewChild(CatsHorizAccordionComponent) catsHorizAccordion: CatsHorizAccordionComponent;

    constructor(
        private fb: FormBuilder,
        private serviceCat: CatService,
        private serviceProp: PropService,
        private serviceAd: AdService,
        private serviceProfile: ProfileService,
        private managerSettings: ManagerService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetection: ChangeDetectorRef,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            catId: [0, Validators.required],
            title: '',
            description: ['', Validators.required],
            price: 0,
            youtube: '',
            isDisabled: false,
            latitude: 0,
            longitude: 0,
            cityName: '',
            countryName: '',
        };
    }

    ngOnInit(): void {
        console.log('init pageAdd');
        this.resetToDefault();

        let sAdIdTmp: string = this.route.snapshot.paramMap.get('adId');

        if (sAdIdTmp) {
            let adIdTmp: number = parseInt(sAdIdTmp);

            if (!isNaN(adIdTmp)) {
                this.adId = adIdTmp;
            }
        }

        Helpers.addScript(this.ymapsPathScript);
    }

    ngOnDestroy(): void {
        console.log('destroy pageAdd');
        this.subscriptions.forEach(x => x.unsubscribe());

        if (this.map) {
            this.map.destroy();// Деструктор карты
        }

        this.map = null;
        this.ym = null;
    }

    ngAfterViewInit(): void {
        if (this.adId) {
            this.loadAd(this.adId, () => {
                this.catsHorizAccordion.render(this.editAd.catId, false, null);
            });
        }
    };

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

                    oldValue = prop.value;

                    /*
                    * Если тип "картинки" есть и если файлов нет, то явно обнулим значение.
                    * Должно отрабатываться после "oldValue = prop.value;"
                    * */
                    if (newProp.name === 'files') {
                        oldValue = null;

                        if (this.editAd.images && this.editAd.images.length) { // images может и не быть
                            this.editAd.images.forEach((img, i) => {
                                newFormGroup.addControl('filesAlreadyHas[' + i + ']', new FormControl(img.filepath));
                            });
                            oldValue = prop.value;
                        }
                    }

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
            Object.keys(this.defaultControls).forEach(defKey => {
                Object.keys(this.editAd).forEach(curKey => {
                    if (defKey === curKey) {
                        this.form.get(defKey).setValue(this.editAd[curKey]);
                        newFormGroup.addControl(defKey, this.form.get(defKey)); // валидатор (нужный) тоже подставится
                        return false;
                    }
                });
            });

            // добавим доп. данные
            newFormGroup.addControl('adId', new FormControl(this.editAd.adId, Validators.required));
            newFormGroup.addControl('userId', new FormControl(this.editAd.userId, Validators.required));

        } else {
            Object.keys(this.defaultControls).forEach(defKey => {
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
        this.createYmap();
    }

    private resetToDefault(): void {
        this.leaf = null;
        this.adId = 0;
        this.previousTitleHelp = '';
        this.aDynamicPropsFull.length = 0;
        this.editAd = null;
        this.isLoadingProps = false;
        this.form = this.fb.group(this.defaultControls);
    }

    private loadParams(catId: number): void {
        this.isLoadingProps = true;
        const s = this.serviceProp.getPropsFullForCat(catId).subscribe(
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

    private loadAd(adId: number, cb: Function): void {
        const s = this.serviceProfile.getAd(adId).subscribe(
            x => {
                this.editAd = x;

                if (cb) {
                    cb();
                }
            },
            err => {
                Helpers.handleErr(err);
                s.unsubscribe();
            },
            () => {
                s.unsubscribe();
            }
        );
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
                alert(isUpdate ? this.attentionTextUpdate : this.attentionTextCreate);
                target.reset(); // на всякий случай и нативную форму сбросим
                this.resetToDefault();
                this.catsHorizAccordion.reset();
                this.router.navigate(['/profile/ads']).then();
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
        if (!target.files.length) {
            let val = null; // если ни чего нет, то нужен null, иначе любая цифра
            let filesAlreadyHas: string[] = [];

            for (let controlsKey in this.form.controls) {
                if (controlsKey.substr(0, 'filesAlreadyHas'.length) === 'filesAlreadyHas') {
                    filesAlreadyHas.push(this.form.get(controlsKey).value);
                }
            }

            if (filesAlreadyHas.length) {
                val = filesAlreadyHas.length; // добавим цифру, чтоб не было деления на массив
            }

            this.form.get('files').setValue(val);
            return;
        }

        // Helpers.addPhoto(target, this.form);

        this.form.patchValue({
            files: target.files
        });
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

    selectLeaf(signal: EmitCatsHorizAccordionInterface): void {
        if (signal.reset) {
            this.resetToDefault();
        }

        this.leaf = signal.cat;
        this.loadParams(signal.cat.catId);
    }

    createYmap(): void {
        if (typeof window['ymaps'] === 'undefined') {
            return;
        }

        this.changeDetection.detectChanges();
        if (!document.getElementById(this.idMap)) {
            return;
        }

        window['ymaps'].ready().done(ym => {
            this.ym = ym;
            this.map = new this.ym.Map(this.idMap, {
                center: this.defaultCenterMap,
                zoom: 10,
            });
            this.addEventClickForYmapForListen(null);
        });
    }

    addEventClickForYmapForListen(myPlacemark: any): void {
        // Слушаем клик на карте.
        this.map.events.add('click', (e) => {
            var coords = e.get('coords');

            // Если метка уже создана – просто передвигаем ее.
            if (myPlacemark) {
                myPlacemark.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                myPlacemark = this.createPlacemark(coords);
                this.map.geoObjects.add(myPlacemark);
                // Слушаем событие окончания перетаскивания на метке.
                myPlacemark.events.add('dragend', () => {
                    this.getAddress(myPlacemark.geometry.getCoordinates(), myPlacemark);
                });
            }

            this.getAddress(coords, myPlacemark);
        });
    }

    // Создание метки.
    createPlacemark(coords): void {
        return new this.ym.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // Определяем адрес по координатам (обратное геокодирование).
    getAddress(coords, myPlacemark): void {
        myPlacemark.properties.set('iconCaption', 'поиск...');
        this.ym.geocode(coords).then(res => {
            const firstGeoObject = res.geoObjects.get(0);
            const country = firstGeoObject.getCountry();
            const city = firstGeoObject.getLocalities().length && firstGeoObject.getLocalities()[0] || null;
            const coord = firstGeoObject.geometry.getCoordinates();

            myPlacemark.properties
                .set({
                    // Формируем строку с данными об объекте.
                    iconCaption: [
                        // Название населенного пункта или вышестоящее административно-территориальное образование.
                        firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
                        // Получаем путь до топонима, если метод вернул null, запрашиваем наименование здания.
                        firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
                    ].filter(Boolean).join(', '),
                    // В качестве контента балуна задаем строку с адресом объекта.
                    balloonContent: firstGeoObject.getAddressLine()
                });

            this.updateMapDataInForm(coord, firstGeoObject.getAddressLine(), city, country);
        }).catch((err) => {
            console.log(err);
        });
    }

    updateMapDataInForm(coord: number[], address: string, city: string | null, country: string | null): void {
        this.form.patchValue({
            ymaps: address, // главное св-во
            latitude: coord[0],
            longitude: coord[1],
            cityName: city,
            countryName: country,
        });
        this.changeDetection.detectChanges();
    }
}

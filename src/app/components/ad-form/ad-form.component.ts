import {ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {AdFullInterface} from '../../interfaces/response/ad';
import {Subscription} from 'rxjs';
import {environment} from '../../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatFullInterface, CatTreeInterface, CatWithDeepInterface} from '../../interfaces/response/cat';
import {CatService} from '../../services/cat.service';
import {PropService} from '../../services/prop.service';
import {AdService} from '../../services/ad.service';
import {ProfileService} from '../../services/profile.service';
import {ManagerService} from '../../services/manager.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MyErrorService} from '../../services/my-error.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-ad-form',
    templateUrl: './ad-form.component.html',
    styleUrls: ['./ad-form.component.less']
})
export class AdFormComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private previousTitleHelp: string;
    private attentionTextCreate: string = 'Объявление добавлено и отправленно на проверку';
    private attentionTextUpdate: string = 'Объявление обновлено и отправленно на проверку';
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    private ymapsPathScript: string = environment.ymapsPathScript;
    private ym: any;
    private map: any;
    private defaultCenterMap: number[] = [55.76, 37.64];
    private _catId: number;
    private _ad: AdFullInterface;
    private catsTree: CatTreeInterface;
    private saveControlNameYmaps: string;

    @Input() mode: string;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formTag', {static: true}) formTag: ElementRef;

    isProdMode: boolean = environment.production;
    url: string = environment.apiUrl;
    idMap: string = 'map';
    youTubeLink: string = environment.youTubeExampleLink;
    form: FormGroup;
    formJSON: Object;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    cat: CatFullInterface; // выбранный на данный момент каталог-лист
    isSendData: boolean = false;
    isLoadingProps: boolean = false;

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
        private serviceAds: AdService,
        private serviceProfile: ProfileService,
        private managerSettings: ManagerService,
        private router: Router,
        private route: ActivatedRoute,
        private changeDetection: ChangeDetectorRef,
        private serviceManager: ManagerService,
        private serviceMyError: MyErrorService,
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
            price: [0, Validators.min(0)],
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

        Helpers.addScript(this.ymapsPathScript);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());

        if (this.map) {
            this.map.destroy();
        }

        this.map = null;
        this.ym = null;
    }

    set ad(x: AdFullInterface) {
        this._ad = x;

        if (this._ad === null) {
            this.formTag.nativeElement.reset();
            this.form.reset();
            return;
        }

        this.form.patchValue(this._ad);
        this.form.get('adId').setValidators([Validators.required, Validators.min(1)]);
        this.onChangeCat();
    }

    get ad(): AdFullInterface {
        return this._ad;
    }

    set newCatId(catIdSrc: number) {
        this._catId = catIdSrc;
        this.ad = null;
        this.formTag.nativeElement.reset();
        this.form.reset();
        this.form.get('catId').setValue(this._catId);
        this.onChangeCat();
    }

    onChangeCat(): void {
        const catId: number = parseInt(this.form.get('catId').value, 10);

        if (Helpers.isLeaf(this.catsTree.childes, catId) !== 1) {
            return;
        }

        this.saveControlNameYmaps = '';
        this.isLoadingProps = true;
        const s = this.serviceCats.getCatId(catId, false).subscribe(
            c => this.responseCat(c),
            err => this.isLoadingProps = false,
            () => this.isLoadingProps = false,
        );

        this.subscriptions.push(s);
    }

    private responseCat(c: CatFullInterface): void {
        const newForm = this.fb.group(this.formJSON);

        // восстановим предыдущие значения (основные) (для объявления).
        // ID-каталога должен быть уже установлен выше
        for (let key in this.form.controls) {
            if (newForm.contains(key)) {
                const control = this.form.get(key);
                let value = control.value || '';

                if (key === 'youtube') {
                    value = Helpers.youTubeLink(value);
                }

                newForm.get(key).setValue(value);
            }
        }

        // переберем динамические св-ва, при необходимости подхватим установленные уже значения
        c.props.forEach(p => {
            let value = (this.tagKindNumber.indexOf(p.kindPropName) !== -1) ? 0 : '';
            let aValidators = [];

            if (p.propIsRequire) {
                aValidators.push(Validators.required);
            }

            // если объявление редактируют, то возьмем значения с уже установленных ранее св-в
            if (this._ad && this._ad.detailsExt && this._ad.detailsExt.length) {
                Object.keys(this._ad.detailsExt).forEach(k => {
                    const el = this._ad.detailsExt[k];

                    if (el.propId === p.propId) {
                        value = el.value || '';

                        // если это цифровой тип, то конвертнем его в цифру
                        if (this.tagKindNumber.indexOf(el.kindPropName) !== -1) {
                            value = parseInt(el.value, 10);

                            if (!value) {
                                value = 0;
                            }
                        }

                        return false;
                    }
                });
            }

            if (p.kindPropName === 'checkbox') {
                p.values.forEach((z, k) => {
                    newForm.addControl('p' + p.propId + '[' + k + ']', this.fb.control(z.propId, aValidators));
                });
                return true;
            }

            if (this.form.contains('p' + p.propId)) {
                value = this.form.get('p' + p.propId).value || '';
            }

            if (p.kindPropName === 'ymaps') {
                this.saveControlNameYmaps = 'p' + p.propId;
            }

            if (p.kindPropName === 'photo') {
                value = '';

                if (this._ad && this._ad.images && this._ad.images.length) { // images может и не быть
                    this._ad.images.forEach((img, k) => {
                        newForm.addControl('filesAlreadyHas[' + k + ']', this.fb.control(img.filepath));
                    });
                    value = this._ad.images.length.toString(); // если есть старые фото, обозначим их
                }

                // при смене категории надо сбрасывать files, p91
                newForm.addControl('files', this.fb.control(value, aValidators));
            }

            // у фото оставляем св-во, т.к. на беке будет проверка данного св-ва.
            // если это фото, то создатся доп-но еще псевдо элемент
            newForm.addControl('p' + p.propId, this.fb.control(value, aValidators));
        });

        // если предыдущей заголовок был со вспомогательным текстом, то обновим заголовок
        if (this.previousTitleHelp) {
            let oldTitleValue = newForm.get('title').value;
            oldTitleValue = oldTitleValue.replace(new RegExp(this.previousTitleHelp, 'gi'), '');
            newForm.get('title').setValue(oldTitleValue.trim());
            this.previousTitleHelp = '';
        }

        // если есть вспомогательный текст, то вставим его
        if (c.titleHelp) {
            let oldTitleValue = newForm.get('title').value;
            oldTitleValue = oldTitleValue.replace(new RegExp(c.titleHelp, 'gi'), '');
            oldTitleValue = c.titleHelp + ' ' + oldTitleValue.trim();
            newForm.get('title').setValue(oldTitleValue);
            this.previousTitleHelp = c.titleHelp;
        }

        // сделаем не обязательным заголовок и скроем его
        if (c.isAutogenerateTitle) {
            newForm.get('title').clearValidators();
        }

        this.form.reset();
        this.form = newForm; // новая форма со старыми осн. значениями, но новыми переменными св-вами
        this.cat = c;
        this.createYmap();
    }

    private resetToDefault(): void {
        this.cat = null;
        this.previousTitleHelp = '';
        this._ad = null;
        this.form = this.fb.group(this.formJSON);
    }

    onSubmit({target}): void {
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
        const fn = this._ad ? this.serviceAds.update(this.form.get('adId').value, newFormData) : this.serviceAds.create(newFormData);

        this.isSendData = true;
        const s = fn.subscribe(
            x => {
                if (this.mode === 'private') {
                    this.json.emit(x);

                    if (!this._ad) {
                        this.ad = null;

                    } else {
                        this.ad = x;
                    }

                    return;
                }

                alert(this._ad ? this.attentionTextUpdate : this.attentionTextCreate);
                this.router.navigate(['/profile/ads']).then();
            },
            err => {
                this.isSendData = false;
                s.unsubscribe();
            },
            () => {
                this.isSendData = false;
                s.unsubscribe();
            }
        );
    }

    addPhoto({target}, pseudoControlName): void {
        if (!target.files.length) {
            let val = ''; // если ни чего нет, то нужен null, иначе любая цифра
            let filesAlreadyHas: string[] = [];

            for (let controlsKey in this.form.controls) {
                if (controlsKey.substr(0, 'filesAlreadyHas'.length) === 'filesAlreadyHas') {
                    filesAlreadyHas.push(this.form.get(controlsKey).value);
                }
            }

            if (filesAlreadyHas.length) {
                val = filesAlreadyHas.length.toString(); // добавим цифру, чтоб не было деления на массив
            }

            this.form.get('files').setValue(val);
            this.form.get(pseudoControlName).setValue(val);
            return;
        }

        this.form.get('files').setValue(target.files);
        this.form.get(pseudoControlName).setValue(target.files.length);
    }

    removePhoto({target}, pseudoControlName): void {
        let owner = target.parentNode;
        let grandFather = owner.parentElement;
        const index = [...grandFather.childNodes].indexOf(owner);

        this.form.removeControl('filesAlreadyHas[' + index + ']');
        owner.remove();

        if (!grandFather.querySelectorAll('.form_thumbnails_thumbnail').length) {
            this.form.get('files').setValue(''); // нельзя пустой объект ставить, т.к. валидатор считает его не пустым
            this.form.get(pseudoControlName).setValue('');
        }
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    // создание карты
    createYmap(): void {
        if (typeof window['ymaps'] === 'undefined') {
            return;
        }

        // проверим: есть ли тег "id=map"
        this.changeDetection.detectChanges();
        if (!document.getElementById(this.idMap)) {
            return;
        }

        window['ymaps'].ready().done(ym => {
            this.ym = ym;
            let center: number[] = this.defaultCenterMap;
            let latitude: number = this.form.get('latitude').value;
            let longitude: number = this.form.get('longitude').value;
            let pm = null;

            if (latitude && longitude) {
                center = [latitude, longitude];
            }

            this.map = new this.ym.Map(this.idMap, {
                center: center,
                zoom: 10,
            });

            if (latitude && longitude) {
                pm = this.createPlacemark(center);
                pm.properties.set('iconCaption', this.form.get(this.saveControlNameYmaps).value);
                this.map.geoObjects.add(pm);
            }

            this.addEventClickForYmapForListen(pm);
        });
    }

    // установка событий на карту
    addEventClickForYmapForListen(pm: any): void {
        // Слушаем клик на карте.
        this.map.events.add('click', (e) => {
            var coords = e.get('coords');

            // Если метка уже создана – просто передвигаем ее.
            if (pm) {
                pm.geometry.setCoordinates(coords);
            }
            // Если нет – создаем.
            else {
                pm = this.createPlacemark(coords);
                this.map.geoObjects.add(pm);
                // Слушаем событие окончания перетаскивания на метке.
                pm.events.add('dragend', () => {
                    this.getAddress(pm.geometry.getCoordinates(), pm);
                });
            }

            this.getAddress(coords, pm);
        });
    }

    // создание метки
    createPlacemark(coords) {
        return new this.ym.Placemark(coords, {
            iconCaption: 'поиск...'
        }, {
            preset: 'islands#violetDotIconWithCaption',
            draggable: true
        });
    }

    // определяем адрес по координатам (обратное геокодирование)
    getAddress(coords, pm): void {
        pm.properties.set('iconCaption', 'поиск...');
        this.ym.geocode(coords).then(res => {
            const firstGeoObject = res.geoObjects.get(0);
            const country = firstGeoObject.getCountry();
            const city = firstGeoObject.getLocalities().length && firstGeoObject.getLocalities()[0] || null;
            const coord = firstGeoObject.geometry.getCoordinates();

            pm.properties.set({
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
            this.serviceMyError.errors$.next({msg: err});
        });
    }

    // обновим форму относительно выбранного адреса на карте
    updateMapDataInForm(coord: number[], address: string, city: string | null, country: string | null): void {
        this.form.patchValue({
            latitude: coord[0],
            longitude: coord[1],
            cityName: city,
            countryName: country,
        });

        this.form.get(this.saveControlNameYmaps).setValue(address); // главное св-во ymaps
        this.changeDetection.detectChanges();
    }
}

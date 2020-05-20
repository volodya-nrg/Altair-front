import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SettingsInterface} from '../../../../../interfaces/response/settings';
import {CatFull, CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {PropInterface} from '../../../../../interfaces/response/prop';
import {DynamicPropsComponent} from '../../dynamic-props/dynamic-props.component';
import {CatService} from '../../../../../services/cat.service';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-cats-put-cats-catid',
    templateUrl: './forms-cats-put-cats-catid.component.html',
    styleUrls: ['./forms-cats-put-cats-catid.component.less'],
})
export class FormsCatsPutCatsCatidComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGet: FormGroup;
    formPut: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    props: PropInterface[] = [];
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild(DynamicPropsComponent) dynamicProps: DynamicPropsComponent;
    @ViewChild('formPutEl', {static: true}) formPutEl: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.formGet = this.fb.group({
            catId: 0,
        });

        this.formPut = this.fb.group(new CatFull());

        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGetCatDataForPut({target}): void {
        if (this.formGet.invalid) {
            for (let key in this.formGet.controls) {
                const formControl = this.formGet.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const catId: number = this.formGet.get('catId').value;
        const s = this.serviceCats.getCatId(catId, false).subscribe(x => {
            this.json.emit(x);
            this.formPutEl.nativeElement.classList.remove('hidden');

            this.formPut = this.fb.group(new CatFull());
            this.formPut.setValue(x);

            // преобразуем нормально в массивы св-ва и их значения
            const aProps = x.props.map(y => {
                let g = this.fb.group(y);
                g.setControl('values', this.fb.array((!y.values ? [] : y.values.map(z => this.fb.group(z)))));
                return g;
            });
            this.formPut.setControl('props', this.fb.array(aProps));
        });
        this.subscriptions.push(s);
    }

    submitFormPutCatsCatId({target}): void {
        if (this.formPut.invalid) {
            for (let key in this.formPut.controls) {
                const formControl = this.formPut.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.put(this.formPut.get('catId').value, this.formPut.value)
            .subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

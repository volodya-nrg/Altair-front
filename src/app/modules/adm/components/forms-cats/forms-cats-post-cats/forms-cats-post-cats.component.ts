import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsInterface} from '../../../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {PropFullInterface, PropInterface} from '../../../../../interfaces/response/prop';
import {CatService} from '../../../../../services/cat.service';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';

@Component({
    selector: 'app-forms-cats-post-cats',
    templateUrl: './forms-cats-post-cats.component.html',
    styleUrls: ['./forms-cats-post-cats.component.less'],
})
export class FormsCatsPostCatsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formPostCats: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    propsFull: PropFullInterface[] = [];
    props: PropInterface[] = [];
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            name: ['', [Validators.required, Validators.minLength(2)]],
            parentId: [0, Validators.min(0)],
            pos: [0, Validators.min(0)],
            isDisabled: false,
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: false,
            props: this.fb.array(this.propsFull),
        };
    }

    ngOnInit(): void {
        this.formPostCats = this.fb.group(this.defaultControls);

        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormPostCats({target}): void {
        if (this.formPostCats.invalid) {
            for (let key in this.formPostCats.controls) {
                const formControl = this.formPostCats.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.post(this.formPostCats.value).subscribe(x => {
            this.json.emit(x);
            target.reset();
            this.formPostCats.reset(this.defaultControls);

            const tmpProps = this.formPostCats.get('props') as FormArray;
            tmpProps.clear();
        });
        this.subscriptions.push(s);
    }
}

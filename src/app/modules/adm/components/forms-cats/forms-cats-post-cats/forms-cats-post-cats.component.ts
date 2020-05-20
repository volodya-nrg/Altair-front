import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SettingsInterface} from '../../../../../interfaces/response/settings';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {PropAssignedForCatInterface} from '../../../../../interfaces/response/prop';
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
    form: FormGroup;
    settings: SettingsInterface;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceCats: CatService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            parentId: [0, Validators.min(0)],
            pos: [0, Validators.min(0)],
            priceAlias: '',
            priceSuffix: '',
            titleHelp: '',
            titleComment: '',
            isAutogenerateTitle: false,
            propsAssigned: this.fb.array(<PropAssignedForCatInterface[]> []),
        });

        const s = this.serviceManager.settings$
            .subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormPostCats({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceCats.post(this.form.value).subscribe(x => {
            this.json.emit(x);
            target.reset();
            this.form.reset();
            (this.form.get('propsAssigned') as FormArray).clear();
        });
        this.subscriptions.push(s);
    }
}

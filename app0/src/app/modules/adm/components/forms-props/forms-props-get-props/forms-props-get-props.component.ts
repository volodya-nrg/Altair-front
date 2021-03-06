import {Component, EventEmitter, OnInit, Output, OnDestroy} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CatWithDeepInterface} from '../../../../../interfaces/response/cat';
import {ManagerService} from '../../../../../services/manager.service';
import {Helpers} from '../../../../../helpers';
import {PropService} from '../../../../../services/prop.service';

@Component({
    selector: 'app-forms-props-get-props',
    templateUrl: './forms-props-get-props.component.html',
    styleUrls: ['./forms-props-get-props.component.less'],
})
export class FormsPropsGetPropsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    catTreeOneLevel: CatWithDeepInterface[] = [];
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            catID: ['0', [Validators.required]],
        });

        const s = this.serviceManager.settings$.subscribe(x => this.catTreeOneLevel = Helpers.getCatTreeAsOneLevel(x.catsTree));
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        if (this.form.invalid) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceProps.getPropsFullForCat(this.form.get('catID').value).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

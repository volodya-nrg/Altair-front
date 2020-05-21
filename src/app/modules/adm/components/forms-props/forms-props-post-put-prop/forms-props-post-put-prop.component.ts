import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {KindPropInterface} from '../../../../../interfaces/response/kind-prop';
import {ValuePropInterface} from '../../../../../interfaces/response/value-prop';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropFullInterface} from '../../../../../interfaces/response/prop';
import {PropService} from '../../../../../services/prop.service';
import {ManagerService} from '../../../../../services/manager.service';

@Component({
    selector: 'app-forms-props-post-put-prop',
    templateUrl: './forms-props-post-put-prop.component.html',
    styleUrls: ['./forms-props-post-put-prop.component.less']
})
export class FormsPropsPostPutPropComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    private _editPropFull: PropFullInterface;
    form: FormGroup;
    defaultControls: Object = {};
    curKindPropName: string;
    kindProps: KindPropInterface[] = [];
    values: ValuePropInterface[] = [];
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    @Output() json: EventEmitter<any> = new EventEmitter();

    set editPropFull(x: PropFullInterface) {
        this.form.reset();
        this.form.patchValue(x);
        this.form.get('kindPropId').setValue(this.form.get('kindPropId').value.toString()); // нужна именно строчка

        let tmp = this.form.get('values') as FormArray;
        tmp.clear();
        x.values.forEach(y => tmp.push(this.fb.group(y)));
        this._editPropFull = x;
    }

    get editPropFull(): PropFullInterface {
        return this._editPropFull;
    }

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            propId: 0, // необходимо для назначеных значений
            title: ['', Validators.required],
            kindPropId: [0, [Validators.required, Validators.min(0)]],
            name: ['', Validators.required],
            suffix: '',
            comment: '',
            privateComment: '',
            selectAsTextarea: '',
            values: this.fb.array(this.values),
        };
    }

    ngOnInit(): void {
        this.form = this.fb.group(this.defaultControls);
        this.form.get('kindPropId').valueChanges.subscribe(x => {
            this.curKindPropName = '';

            this.kindProps.forEach(y => {
                if (y.kindPropId == x) {
                    this.curKindPropName = y.name;
                }
            });

            if (this.curKindPropName !== 'select') {
                this.form.get('selectAsTextarea').setValue('');
            }

            if (this.tagKindNumber.indexOf(this.curKindPropName) === -1) {
                let tmp = this.form.get('values') as FormArray;
                tmp.clear();
            }
        });

        const s = this.serviceManager.settings$.subscribe(x => this.kindProps = x.kindProps);
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitForm({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const propId: number = this.form.get('propId').value;
        const fn = propId ? this.serviceProps.update(propId, this.form.value) : this.serviceProps.create(this.form.value);
        const s = fn.subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

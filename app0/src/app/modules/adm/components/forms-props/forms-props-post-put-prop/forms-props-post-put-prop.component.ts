import {Component, EventEmitter, OnDestroy, OnInit, Output, AfterViewInit} from '@angular/core';
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
export class FormsPropsPostPutPropComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private privateEditPropFull: PropFullInterface;
    form: FormGroup;
    defaultControls: object = {};
    curKindPropName: string;
    kindProps: KindPropInterface[] = [];
    values: ValuePropInterface[] = [];
    private tagKindNumber: string[] = this.serviceManager.tagKindNumber;
    @Output() json: EventEmitter<any> = new EventEmitter();

    set editPropFull(x: PropFullInterface) {
        this.form.reset();
        this.form.patchValue(x);
        this.form.get('kindPropID').setValue(this.form.get('kindPropID').value.toString()); // нужна именно строчка

        const tmp = this.form.get('values') as FormArray;
        tmp.clear();
        x.values.forEach(y => tmp.push(this.fb.group(y)));
        this.privateEditPropFull = x;
    }

    get editPropFull(): PropFullInterface {
        return this.privateEditPropFull;
    }

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            propID: 0, // необходимо для назначеных значений
            title: ['', Validators.required],
            name: ['', Validators.required],
            kindPropID: [0, [Validators.required, Validators.min(0)]], // 0, т.к. не для всех
            suffix: '',
            comment: '',
            privateComment: '',
            selectAsTextarea: '',
            values: this.fb.array(this.values),
        };
    }

    ngOnInit(): void {
        this.form = this.fb.group(this.defaultControls);
        this.form.get('kindPropID').valueChanges.subscribe(x => {
            this.curKindPropName = '';

            this.kindProps.forEach(y => {
                if (y.kindPropID === x) {
                    this.curKindPropName = y.name;
                }
            });

            if (this.curKindPropName !== 'select') {
                this.form.get('selectAsTextarea').setValue('');
            }

            if (this.tagKindNumber.indexOf(this.curKindPropName) === -1) {
                const tmp = this.form.get('values') as FormArray;
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
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const propID: number = this.form.get('propID').value;
        const fn = propID ? this.serviceProps.update(propID, this.form.value) : this.serviceProps.create(this.form.value);
        const s = fn.subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

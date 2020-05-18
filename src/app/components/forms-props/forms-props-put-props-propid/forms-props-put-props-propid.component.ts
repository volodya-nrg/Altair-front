import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropFullInterface} from '../../../interfaces/response/prop';
import {ManagerService} from '../../../services/manager.service';
import {Helpers} from '../../../helpers';
import {KindPropInterface} from '../../../interfaces/response/kind-prop';
import {ValuePropInterface} from '../../../interfaces/response/value-prop';
import {PropService} from '../../../services/prop.service';

@Component({
    selector: 'app-forms-props-put-props-propid',
    templateUrl: './forms-props-put-props-propid.component.html',
    styleUrls: ['./forms-props-put-props-propid.component.less'],
})
export class FormsPropsPutPropsPropidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    kindProps: KindPropInterface[] = [];
    values: ValuePropInterface[] = [];
    formGetPropsPropId: FormGroup;
    form: FormGroup;
    defaultControls: Object = {};
    editPropFull: PropFullInterface;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

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
            values: this.fb.array(this.values),
        };
    }

    ngOnInit(): void {
        console.log('init adm props put');

        this.formGetPropsPropId = this.fb.group({
            propId: [0, [Validators.required, Validators.min(1)]],
        });
        this.form = this.fb.group(this.defaultControls);

        const s = this.serviceManager.settings$.subscribe(
            x => this.kindProps = x.kindProps,
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy adm props put');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGet({target}): void {
        if (this.formGetPropsPropId.invalid) {
            for (let key in this.formGetPropsPropId.controls) {
                const formControl = this.formGetPropsPropId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceProps.getOne(this.formGetPropsPropId.get('propId').value).subscribe(
            x => {
                // затереть предыдущее
                this.form = this.fb.group(this.defaultControls);
                let tmp1 = this.form.get('values') as FormArray;
                tmp1.clear();
                this.editPropFull = null;

                this.json.emit(x);
                this.formPut.nativeElement.classList.remove('hidden');
                this.form.patchValue(x);
                this.form.get('kindPropId').setValue(this.form.get('kindPropId').value.toString()); // нужна именно строчка

                let tmp2 = this.form.get('values') as FormArray;
                x.values.forEach(y => {
                    tmp2.push(this.fb.group(y));
                });

                this.editPropFull = x;
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    submitFormPut({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceProps.update(this.form.get('propId').value, this.form.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {KindPropInterface} from '../../../interfaces/response/kind-prop';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {KindPropsService} from '../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-put',
    templateUrl: './forms-kind-props-put.component.html',
    styleUrls: ['./forms-kind-props-put.component.less'],
})
export class FormsKindPropsPutComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGetKindPropsKindPropId: FormGroup;
    form: FormGroup;
    defaultControls: Object = {};
    editKindProp: KindPropInterface;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceKindProps: KindPropsService,
    ) {
        this.defaultControls = {
            kindPropId: [0, [Validators.required, Validators.min(0)]],
            name: ['', Validators.required],
        };
    }

    ngOnInit(): void {
        console.log('init adm kind-props put');

        this.formGetKindPropsKindPropId = this.fb.group({
            kindPropId: [0, [Validators.required, Validators.min(1)]],
        });
        this.form = this.fb.group(this.defaultControls);
    }

    ngOnDestroy(): void {
        console.log('destroy adm kind-props put');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGet({target}): void {
        if (this.formGetKindPropsKindPropId.invalid) {
            for (let key in this.formGetKindPropsKindPropId.controls) {
                const formControl = this.formGetKindPropsKindPropId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceKindProps.getOne(this.formGetKindPropsKindPropId.get('kindPropId').value).subscribe(
            x => {
                // затереть предыдущее
                this.form = this.fb.group(this.defaultControls);
                this.editKindProp = null;

                this.json.emit(x);
                this.formPut.nativeElement.classList.remove('hidden');
                this.form.patchValue(x);
                this.editKindProp = x;
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

        const s = this.serviceKindProps.update(this.form.get('kindPropId').value, this.form.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

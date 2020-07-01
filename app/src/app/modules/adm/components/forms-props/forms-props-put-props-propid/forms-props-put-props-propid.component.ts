import {Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropService} from '../../../../../services/prop.service';
import {FormsPropsPostPutPropComponent} from '../forms-props-post-put-prop/forms-props-post-put-prop.component';

@Component({
    selector: 'app-forms-props-put-props-propid',
    templateUrl: './forms-props-put-props-propid.component.html',
    styleUrls: ['./forms-props-put-props-propid.component.less'],
})
export class FormsPropsPutPropsPropidComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPutWrapper', {static: true}) formPutWrapper: ElementRef;
    @ViewChild(FormsPropsPostPutPropComponent) formsPropsPostPutProp: FormsPropsPostPutPropComponent;

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            propId: [0, [Validators.required, Validators.min(1)]],
        });
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

        const s = this.serviceProps.getOne(this.form.get('propId').value).subscribe(x => {
            this.formPutWrapper.nativeElement.classList.remove('hidden');
            this.formsPropsPostPutProp.editPropFull = x;
        });
        this.subscriptions.push(s);
    }
}

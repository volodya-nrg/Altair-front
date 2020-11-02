import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KindPropsService} from '../../../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-put',
    templateUrl: './forms-kind-props-put.component.html',
    styleUrls: ['./forms-kind-props-put.component.less'],
})
export class FormsKindPropsPutComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGet: FormGroup;
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceKindProps: KindPropsService,
    ) {
    }

    ngOnInit(): void {
        this.formGet = this.fb.group({
            kindPropID: [0, [Validators.required, Validators.min(1)]],
        });
        this.form = this.fb.group({
            kindPropID: [0, [Validators.required, Validators.min(0)]],
            name: ['', Validators.required],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGet({target}): void {
        if (this.formGet.invalid) {
            for (const key of Object.keys(this.formGet.controls)) {
                const formControl = this.formGet.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const kindPropID: number = this.formGet.get('kindPropID').value;
        const s = this.serviceKindProps.getOne(kindPropID).subscribe(x => {
            this.json.emit(x);
            this.formPut.nativeElement.classList.remove('hidden');
            this.form.reset();
            this.form.patchValue(x);
        });
        this.subscriptions.push(s);
    }

    submitFormPut({target}): void {
        if (this.form.invalid) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceKindProps.update(this.form.get('kindPropID').value, this.form.value)
            .subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

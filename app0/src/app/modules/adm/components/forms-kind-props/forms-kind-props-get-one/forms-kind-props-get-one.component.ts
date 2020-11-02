import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KindPropsService} from '../../../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-get-one',
    templateUrl: './forms-kind-props-get-one.component.html',
    styleUrls: ['./forms-kind-props-get-one.component.less'],
})
export class FormsKindPropsGetOneComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceKindProps: KindPropsService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            kindPropID: [0, [Validators.required, Validators.min(1)]],
        });
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

        const s = this.serviceKindProps.getOne(this.form.get('kindPropID').value).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

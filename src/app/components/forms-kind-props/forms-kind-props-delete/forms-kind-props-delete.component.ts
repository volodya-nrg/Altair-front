import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {KindPropsService} from '../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-delete',
    templateUrl: './forms-kind-props-delete.component.html',
    styleUrls: ['./forms-kind-props-delete.component.less'],
})
export class FormsKindPropsDeleteComponent implements OnInit {
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
            kindPropId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
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

        const s = this.serviceKindProps.delete(this.form.get('kindPropId').value).subscribe(x => {
            this.json.emit(x);
            this.form.reset();
        });
        this.subscriptions.push(s);
    }
}

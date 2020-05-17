import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {PropService} from '../../../services/prop.service';

@Component({
    selector: 'app-forms-props-delete-props-propid',
    templateUrl: './forms-props-delete-props-propid.component.html',
    styleUrls: ['./forms-props-delete-props-propid.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsPropsDeletePropsPropidComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm props delete');

        this.form = this.fb.group({
            propId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm props delete');
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

        const s = this.serviceProps.delete(this.form.get('propId').value).subscribe(
            x => {
                this.json.emit(x);
                this.form.reset();
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}
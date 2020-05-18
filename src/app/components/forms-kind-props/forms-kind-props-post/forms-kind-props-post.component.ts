import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {KindPropsService} from '../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-post',
    templateUrl: './forms-kind-props-post.component.html',
    styleUrls: ['./forms-kind-props-post.component.less'],
})
export class FormsKindPropsPostComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    defaultControls: Object = {};
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceKindProps: KindPropsService,
    ) {
        this.defaultControls = {
            name: ['', Validators.required],
        };
    }

    ngOnInit(): void {
        console.log('init adm kind-props post');
        this.form = this.fb.group(this.defaultControls);
    }

    ngOnDestroy(): void {
        console.log('destroy adm kind-props post');
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

        const s = this.serviceKindProps.create(this.form.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

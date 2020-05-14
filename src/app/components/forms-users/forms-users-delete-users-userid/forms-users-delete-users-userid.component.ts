import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Helpers} from '../../../helpers';

@Component({
    selector: 'app-forms-users-delete-users-userid',
    templateUrl: './forms-users-delete-users-userid.component.html',
    styleUrls: ['./forms-users-delete-users-userid.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsUsersDeleteUsersUseridComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm users delete');

        this.form = this.fb.group({
            userId: [0, [Validators.required, Validators.min(1)]],
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm users delete');
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

        const s = this.serviceUsers.delete(this.form.get('userId').value).subscribe(
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

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../services/user.service';

@Component({
    selector: 'app-forms-users-delete-users-userid',
    templateUrl: './forms-users-delete-users-userid.component.html',
    styleUrls: ['./forms-users-delete-users-userid.component.less'],
})
export class FormsUsersDeleteUsersUserIDComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            userID: [0, [Validators.required, Validators.min(1)]],
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

        const s = this.serviceUsers.delete(this.form.get('userID').value).subscribe(x => {
            this.json.emit(x);
            this.form.reset();
        });
        this.subscriptions.push(s);
    }
}

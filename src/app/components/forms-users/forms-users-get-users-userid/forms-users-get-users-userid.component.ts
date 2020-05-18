import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-forms-users-get-users-userid',
    templateUrl: './forms-users-get-users-userid.component.html',
    styleUrls: ['./forms-users-get-users-userid.component.less'],
})
export class FormsUsersGetUsersUseridComponent implements OnInit, OnDestroy {
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
            userId: 0,
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

        const s = this.serviceUsers.getUser(this.form.get('userId').value).subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

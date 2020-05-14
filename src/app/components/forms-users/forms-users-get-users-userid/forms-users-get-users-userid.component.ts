import {Component, EventEmitter, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Helpers} from '../../../helpers';

@Component({
    selector: 'app-forms-users-get-users-userid',
    templateUrl: './forms-users-get-users-userid.component.html',
    styleUrls: ['./forms-users-get-users-userid.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class FormsUsersGetUsersUseridComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm cats');

        this.form = this.fb.group({
            userId: 0,
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm cats');
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

        const s = this.serviceUsers.getUser(this.form.get('userId').value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {UserService} from '../../../services/user.service';

@Component({
    selector: 'app-forms-users-get-users',
    templateUrl: './forms-users-get-users.component.html',
    styleUrls: ['./forms-users-get-users.component.less'],
})
export class FormsUsersGetUsersComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formGetUsers: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm users');

        this.formGetUsers = this.fb.group({});
    }

    ngOnDestroy(): void {
        console.log('destroy adm users');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetUsers({target}): void {
        const s = this.serviceUsers.getUsers().subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

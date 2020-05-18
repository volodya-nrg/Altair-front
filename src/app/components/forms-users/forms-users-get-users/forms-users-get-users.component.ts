import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
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
        this.formGetUsers = this.fb.group({});
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormGetUsers({target}): void {
        const s = this.serviceUsers.getUsers().subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

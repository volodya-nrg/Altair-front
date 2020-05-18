import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Helpers} from '../../../helpers';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-forms-users-post-users',
    templateUrl: './forms-users-post-users.component.html',
    styleUrls: ['./forms-users-post-users.component.less'],
})
export class FormsUsersPostUsersComponent implements OnInit, OnDestroy {
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
            email: ['test@test.te', [Validators.required, Validators.email]],
            password: ['test123', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            passwordConfirm: ['test123', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            files: '',
            name: '',
            isEmailConfirmed: false,
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitFormPostUsers({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const newFormData = Helpers.getNewFormData(this.form.value);
        const s = this.serviceUsers.create(newFormData).subscribe(
            x => {
                this.json.emit(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);

        // if (target.files.length) {
        //     this.form.markAsDirty();
        // }
        // this.form.patchValue({
        //     files: target.files
        // });
    }
}

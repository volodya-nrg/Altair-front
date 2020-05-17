import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Helpers} from '../../../helpers';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-forms-users-put-users-userid',
    templateUrl: './forms-users-put-users-userid.component.html',
    styleUrls: ['./forms-users-put-users-userid.component.less'],
})
export class FormsUsersPutUsersUseridComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    formGetUsersUserId: FormGroup;
    formPutUsersUserId: FormGroup;
    url: string = environment.apiUrl;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPut', {static: true}) formPut: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm users put');

        this.formGetUsersUserId = this.fb.group({
            userId: [0, [Validators.required, Validators.min(1)]],
        });
        this.formPutUsersUserId = this.fb.group({
            userId: [0, [Validators.required, Validators.min(1)]],
            email: ['', [Validators.required, Validators.email]],
            password: '',
            passwordConfirm: '', // не null, проверка не нужна
            files: '',
            avatar: '',
            name: '',
            isEmailConfirmed: false,
        });
    }

    ngOnDestroy(): void {
        console.log('destroy adm users put');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGetUsersUserId({target}): void {
        if (this.formGetUsersUserId.invalid) {
            for (let key in this.formGetUsersUserId.controls) {
                const formControl = this.formGetUsersUserId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceUsers.getUser(this.formGetUsersUserId.get('userId').value).subscribe(
            x => {
                this.json.emit(x);
                this.formPut.nativeElement.classList.remove('hidden');
                this.formPutUsersUserId.patchValue(x);
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    submitFormPutUsersUserId({target}): void {
        if (this.formPutUsersUserId.invalid) {
            for (let key in this.formPutUsersUserId.controls) {
                const formControl = this.formPutUsersUserId.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const newFormData = Helpers.getNewFormData(this.formPutUsersUserId.value);
        const s = this.serviceUsers.update(this.formPutUsersUserId.get('userId').value, newFormData).subscribe(
            x => {
                this.json.emit(x);
                target.reset();
                this.formPutUsersUserId.reset();
                this.formPutUsersUserId.patchValue({
                    userId: x.userId,
                    email: x.email,
                    avatar: x.avatar,
                    name: x.name,
                    password: '',
                    passwordConfirm: '', // не null, проверка не нужна
                    isEmailConfirmed: x.isEmailConfirmed,
                });
            },
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        if (target.files.length) {
            this.formPutUsersUserId.markAsDirty();
        }
        this.formPutUsersUserId.patchValue({
            files: target.files
        });
    }

    removePhoto({target}): void {
        this.formPutUsersUserId.patchValue({
            avatar: '',
        });
    }
}

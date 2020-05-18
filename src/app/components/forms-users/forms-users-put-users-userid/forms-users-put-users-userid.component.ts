import {AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
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
    formGet: FormGroup;
    formPut: FormGroup;
    url: string = environment.apiUrl;
    @Output() json: EventEmitter<any> = new EventEmitter();
    @ViewChild('formPutTag', {static: true}) formPutTag: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceUsers: UserService,
    ) {
    }

    ngOnInit(): void {
        this.formGet = this.fb.group({
            userId: [0, [Validators.required, Validators.min(1)]],
        });
        this.formPut = this.fb.group({
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
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    submitFormGetUsersUserId({target}): void {
        if (this.formGet.invalid) {
            for (let key in this.formGet.controls) {
                const formControl = this.formGet.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceUsers.getUser(this.formGet.get('userId').value).subscribe(x => {
            this.json.emit(x);
            this.formPutTag.nativeElement.classList.remove('hidden');
            this.formPut.patchValue(x);
        });
        this.subscriptions.push(s);
    }

    submitFormPutUsersUserId({target}): void {
        if (this.formPut.invalid) {
            for (let key in this.formPut.controls) {
                const formControl = this.formPut.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const newFormData = Helpers.getNewFormData(this.formPut.value);
        const s = this.serviceUsers.update(this.formPut.get('userId').value, newFormData).subscribe(x => {
            this.json.emit(x);
            target.reset();
            this.formPut.reset();
            this.formPut.patchValue({
                userId: x.userId,
                email: x.email,
                avatar: x.avatar,
                name: x.name,
                password: '',
                passwordConfirm: '', // не null, проверка не нужна
                isEmailConfirmed: x.isEmailConfirmed,
            });
        });
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.formPut);
    }

    removePhoto({target}): void {
        this.formPut.get('avatar').setValue('');
    }
}

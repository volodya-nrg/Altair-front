import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {UserInterface} from '../../../interfaces/response/user';
import {AuthService} from '../../../services/auth.service';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-page-profile-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageProfileInfoComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private attentionMsg: string = 'Вы точно хотите удалить профиль?\nОн и все сопутствующие данные удалятся безвовзравно.\nПосле восстановить уже не получится.';
    url: string = environment.apiUrl;
    form: FormGroup;
    profile: UserInterface;

    constructor(
        private fb: FormBuilder,
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
        private router: Router,
    ) {
        this.form = this.fb.group({
            files: new FormControl(''),
            avatar: new FormControl(''),
            name: new FormControl(''),
            passwordOld: new FormControl('', Validators.minLength(environment.minLenPassword)),
            passwordNew: new FormControl('', Validators.minLength(environment.minLenPassword)),
            passwordConfirm: new FormControl('', Validators.minLength(environment.minLenPassword)),
        }, {validators: PasswordsValidator});
    }

    ngOnInit(): void {
        console.log('init page profile info');
        this.serviceAuth.profileBhSubject.subscribe(x => {
            this.profile = x;

            if (!x) {
                return;
            }

            this.form.patchValue({
                avatar: this.profile.avatar,
                name: this.profile.name,
            });
        });
    }

    ngOnDestroy(): void {
        console.log('destroy page profile info');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    onSubmit({target}): void {
        if (this.form.invalid) {
            if (this.form.hasError('passwordsError')) {
                console.log(this.form.getError('passwordsError'));
            }
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const newFormData = Helpers.getNewFormData(this.form.value);
        const btnSubmit = target.querySelector('[type="submit"]');

        target.classList.add('sx-loading');
        btnSubmit.disabled = true;
        const s = this.serviceProfile.update(newFormData).subscribe(
            x => {
                this.serviceAuth.profileBhSubject.next(x);
                this.form.markAsPristine();
            },
            err => {
                btnSubmit.disabled = false;
                target.classList.remove('sx-loading');
                Helpers.handleErr(err.error);
            },
            () => {
                btnSubmit.disabled = false;
                target.classList.remove('sx-loading');
            }
        );
        this.subscriptions.push(s);
    }

    deleteProfile({target}): void {
        if (confirm(this.attentionMsg)) {
            target.disable = true;
            const s = this.serviceProfile.delete().subscribe(
                x => {
                    // отписку не делаем, т.к. нужно чтоб она по любому отработала
                    this.serviceAuth.logout().subscribe(x => {
                        this.serviceAuth.JWT = '';
                    });
                    this.router.navigate(['/main']).then();
                },
                err => {
                    target.disable = false;
                    Helpers.handleErr(err.error);
                },
                () => {
                    target.disable = false;
                }
            );
            this.subscriptions.push(s);
        }

    }

    addPhoto({target}): void {
        if (target.files.length) {
            this.form.markAsDirty();
        }
        this.form.patchValue({
            files: target.files
        });
    }
}

export const PasswordsValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const passwordOld = control.get('passwordOld').value.trim();
    const passwordNew = control.get('passwordNew').value.trim();
    const passwordConfirm = control.get('passwordConfirm').value.trim();

    if (!passwordOld && !passwordNew && !passwordConfirm || passwordOld && passwordNew === passwordConfirm) {
        return null;
    }

    return {passwordsError: 'ошибка в паролях'};
};

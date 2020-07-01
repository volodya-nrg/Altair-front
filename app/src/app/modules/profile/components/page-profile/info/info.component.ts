import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Helpers} from '../../../../../helpers';
import {UserExtInterface} from '../../../../../interfaces/response/user';
import {AuthService} from '../../../../../services/auth.service';
import {ProfileService} from '../../../../../services/profile.service';
import {environment} from '../../../../../../environments/environment';
import {ChangeOldPassword} from '../../../../../validators/change-old-password';
import {isPlatformBrowser} from '@angular/common';
import {MyErrorService} from '../../../../../services/my-error.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-profile-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.less'],
})
export class PageProfileInfoComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private attentionMsg: string = 'Вы точно хотите удалить профиль?\nОн и все сопутствующие данные удалятся безвовзравно.\nПосле восстановить уже не получится.';
    private avatarSave: string = '';
    form: FormGroup;
    profile: UserExtInterface;
    isProdMode: boolean = environment.production;
    titleForAvatarDelete: string = 'удалить';
    titleForAvatarRecover: string = 'восстановить';
    titleForAvatar: string = '';
    isSocialEmail: boolean = false;
    @ViewChild('avatar', {static: true}) avatar: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
        private serviceMyError: MyErrorService,
        private router: Router,
        private serviceTitle: Title,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
        this.form = this.fb.group({
            files: '',
            avatar: '',
            name: '',
            email: '',
            passwordOld: ['', Validators.minLength(environment.minLenPassword)],
            passwordNew: ['', Validators.minLength(environment.minLenPassword)],
            passwordConfirm: ['', Validators.minLength(environment.minLenPassword)],
        }, {validators: ChangeOldPassword.PasswordsValidator});

        this.titleForAvatar = this.titleForAvatarDelete;
    }

    ngOnInit(): void {
        const s = this.serviceAuth.profile$.subscribe(x => {
            this.profile = x;

            if (x) {
                this.form.patchValue(x);
                this.isSocialEmail = Helpers.isSocialEmail(x.email);
            } else {
                this.form.reset();
            }
        });
        this.subscriptions.push(s);

        this.serviceTitle.setTitle('Профиль: основные данные');
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
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
                target.reset();
                this.form.reset();
                this.serviceAuth.profile$.next(x); // userExt (user, phones)
                this.avatarSave = '';
                this.form.patchValue({
                    passwordOld: '',
                    passwordNew: '',
                    passwordConfirm: '',
                });
            },
            err => {
                btnSubmit.disabled = false;
                target.classList.remove('sx-loading');
                this.resetStatementAvatar();
            },
            () => {
                btnSubmit.disabled = false;
                target.classList.remove('sx-loading');
                this.resetStatementAvatar();
            }
        );
        this.subscriptions.push(s);
    }

    deleteProfile({target}): void {
        if (isPlatformBrowser(this.platformId) && !confirm(this.attentionMsg)) {
            return;
        }

        target.disable = true;
        const s = this.serviceProfile.delete().subscribe(
            x1 => {
                // отписку не делаем, т.к. нужно чтоб она по любому отработала
                this.serviceAuth.logout().subscribe(
                    x2 => this.serviceAuth.JWT = '',
                    err => this.serviceMyError.errors$.next({msg: err}),
                    () => {
                    }
                );
                this.router.navigate(['/main']).then();
            },
            err => {
                target.disable = false;
                this.serviceMyError.errors$.next({msg: err});
            },
            () => target.disable = false
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);
    }

    deletePhoto(): void {
        const avatarTag = this.avatar.nativeElement;

        if (avatarTag.classList.contains('sx-statement')) {
            this.resetStatementAvatar();
            this.form.get('avatar').setValue(this.avatarSave);

        } else {
            avatarTag.classList.add('sx-statement');
            this.avatarSave = this.form.get('avatar').value;
            this.titleForAvatar = this.titleForAvatarRecover;
            this.form.get('avatar').setValue('');
            this.form.markAsDirty();
        }
    }

    resetStatementAvatar(): void {
        this.avatar.nativeElement.classList.remove('sx-statement');
        this.titleForAvatar = this.titleForAvatarDelete;
    }
}

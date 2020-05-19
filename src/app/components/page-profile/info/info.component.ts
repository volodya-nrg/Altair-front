import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {UserInterface} from '../../../interfaces/response/user';
import {AuthService} from '../../../services/auth.service';
import {ProfileService} from '../../../services/profile.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {ChangeOldPassword} from '../../../validators/change-old-password';

@Component({
    selector: 'app-page-profile-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.less'],
})
export class PageProfileInfoComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private attentionMsg: string = 'Вы точно хотите удалить профиль?\nОн и все сопутствующие данные удалятся безвовзравно.\nПосле восстановить уже не получится.';
    private avatarSave: string = '';
    url: string = environment.apiUrl;
    form: FormGroup;
    profile: UserInterface;
    isProdMode: boolean = environment.production;
    @ViewChild('avatar', {static: true}) avatar: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
        private router: Router,
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
    }

    ngOnInit(): void {
        const s = this.serviceAuth.profile$.subscribe(x => {
            this.profile = x;

            if (!x) {
                return;
            }

            this.form.patchValue(x);
        });
        this.subscriptions.push(s);
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
                this.serviceAuth.profile$.next(x);
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
            },
            () => {
                btnSubmit.disabled = false;
                target.classList.remove('sx-loading');
            }
        );
        this.subscriptions.push(s);
    }

    deleteProfile({target}): void {
        if (!confirm(this.attentionMsg)) {
            return;
        }

        target.disable = true;
        const s = this.serviceProfile.delete().subscribe(
            x => {
                // отписку не делаем, т.к. нужно чтоб она по любому отработала
                this.serviceAuth.logout().subscribe(x => this.serviceAuth.JWT = '');
                this.router.navigate(['/main']).then();
            },
            err => target.disable = false,
            () => target.disable = false
        );
        this.subscriptions.push(s);
    }

    addPhoto({target}): void {
        Helpers.addPhoto(target, this.form);
    }

    deletePhoto({target}): void {
        const avatarTag = this.avatar.nativeElement;

        if (avatarTag.classList.contains('sx-statement')) {
            avatarTag.classList.remove('sx-statement');
            this.form.get('avatar').setValue(this.avatarSave);

        } else {
            avatarTag.classList.add('sx-statement');
            this.avatarSave = this.form.get('avatar').value;
            this.form.get('avatar').setValue('');
            this.form.markAsDirty();
        }
    }
}

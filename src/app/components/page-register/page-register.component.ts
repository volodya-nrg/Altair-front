import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';
import {Helpers} from '../../helpers';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.less']
})
export class PageRegisterComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private serviceAuth: AuthService,
        private serviceSettings: SettingsService,
        private serviceUser: UserService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl('test@test.te', [Validators.required, Validators.email]),
            password: new FormControl('test123', [Validators.required, Validators.minLength(6)]),
            passwordConfirm: new FormControl('test123', [Validators.required, Validators.minLength(6)]),
            agreeOffer: new FormControl(true, Validators.requiredTrue),
            agreePolicy: new FormControl(true, Validators.requiredTrue),
        });
    }

    ngOnDestroy(): void {
        console.log('destroy PageLogin');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    onSubmit({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const btnSubmit = target.querySelector('[type="submit"]');
        btnSubmit.disabled = true;
        const s = this.serviceUser.create(this.form.value).subscribe(
            x => {
                this.router.navigate(['/register/ok']).then(r => {
                });
            },
            err => {
                btnSubmit.disabled = false;
                Helpers.handleErr(err.error);
            },
            () => {
                btnSubmit.disabled = false;
            }
        );
        this.subscriptions.push(s);
    }
}

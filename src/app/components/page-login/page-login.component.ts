import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../helpers';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.less']
})
export class PageLoginComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private serviceAuth: AuthService,
        private serviceSettings: SettingsService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: new FormControl('test@test.te', [Validators.required, Validators.email]),
            password: new FormControl('test123', [Validators.required, Validators.minLength(6)]),
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
        const s = this.serviceAuth.login(this.form.value).subscribe(
            x => {
                this.serviceSettings.JWT = x.JWT;
                this.router.navigate(['/profile']).then(r => {
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

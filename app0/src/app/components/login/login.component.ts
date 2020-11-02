import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {environment} from '../../../environments/environment';
import {isPlatformBrowser} from '@angular/common';
import {MyErrorService} from '../../services/my-error.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private aState: string[] = ['vk', 'ok', 'fb', 'ggl'];
    form: FormGroup;
    @ViewChild('submit', {static: true}) submit: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceAuth: AuthService,
        private serviceMyError: MyErrorService,
        private router: Router,
        private route: ActivatedRoute,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        const code: string = this.route.snapshot.queryParamMap.get('code');
        const state: string = this.route.snapshot.queryParamMap.get('state');
        const error: string = this.route.snapshot.queryParamMap.get('error');
        const errorDescription: string = this.route.snapshot.queryParamMap.get('error_description');

        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            code: '',
            state: '',
        });

        const s = this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.serviceAuth.toggleModalAuth$.next(false);
            }
        });
        this.subscriptions.push(s);

        // ответ от соц. сетей
        if (code && this.aState.indexOf(state) > -1) {
            if (isPlatformBrowser(this.platformID)) {
                this.form.get('email').setValue('test@test.te');
                this.form.get('password').setValue('1234567890');
                this.form.get('code').setValue(code);
                this.form.get('state').setValue(state);
                this.onSubmit();
                this.form.reset();
            }
        } else if (errorDescription) {
            this.serviceMyError.errors$.next({msg: errorDescription});
        } else if (error) {
            this.serviceMyError.errors$.next({msg: error});
        }
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    onSubmit(): void {
        if (this.form.invalid === true) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }
        const submit = this.submit.nativeElement;

        submit.disabled = true;
        const s = this.serviceAuth.login(this.form.value).subscribe(
            x => {
                this.serviceAuth.JWT = x.JWT;
                this.serviceAuth.profile$.next(x.userExt);
                this.router.navigate(['/profile']).then();
            },
            err => submit.disabled = false,
            () => submit.disabled = false
        );
        this.subscriptions.push(s);
    }
}

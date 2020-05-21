import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @ViewChild('submit', {static: true}) submit: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceAuth: AuthService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['test@test.te', [Validators.required, Validators.email]],
            password: ['test123', [Validators.required, Validators.minLength(environment.minLenPassword)]],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    onSubmit(): void {
        if (this.form.invalid === true) {
            for (let key in this.form.controls) {
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
                this.serviceAuth.profile$.next(x.user);
                this.router.navigate(['/profile']).then();
            },
            err => submit.disabled = false,
            () => submit.disabled = false
        );
        this.subscriptions.push(s);
    }
}

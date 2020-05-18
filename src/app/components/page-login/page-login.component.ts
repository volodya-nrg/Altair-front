import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../helpers';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-page-login',
    templateUrl: './page-login.component.html',
    styleUrls: ['./page-login.component.less'],
})
export class PageLoginComponent implements OnInit, OnDestroy, AfterViewInit {
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
            email: new FormControl('test@test.te', [Validators.required, Validators.email]),
            password: new FormControl('test123', [Validators.required, Validators.minLength(environment.minLenPassword)]),
        });
    }

    ngOnDestroy(): void {
        console.log('destroy PageLogin');
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

        this.submit.nativeElement.disabled = true;
        const s = this.serviceAuth.login(this.form.value).subscribe(
            x => {
                this.serviceAuth.JWT = x.JWT;
                this.serviceAuth.profileBhSubject.next(x.user);
                this.router.navigate(['/profile']).then();
            },
            err => {
                this.submit.nativeElement.disabled = false;
                Helpers.handleErr(err.error);
            },
            () => {
                this.submit.nativeElement.disabled = false;
            }
        );
        this.subscriptions.push(s);
    }
}

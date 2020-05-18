import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../services/profile.service';
import {environment} from '../../../environments/environment';

@Component({
    selector: 'app-page-register',
    templateUrl: './page-register.component.html',
    styleUrls: ['./page-register.component.less'],
})
export class PageRegisterComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    isProdMode: boolean = environment.production;
    @ViewChild('submit', {static: true}) submit: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceAuth: AuthService,
        private serviceProfile: ProfileService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            email: ['test@test.te', [Validators.required, Validators.email]],
            password: ['test123', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            passwordConfirm: ['test123', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            agreeOffer: [true, Validators.requiredTrue],
            agreePolicy: [true, Validators.requiredTrue],
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    onSubmit(): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        this.submit.nativeElement.disabled = true;
        const s = this.serviceProfile.create(this.form.value).subscribe(
            x => this.router.navigate(['/register/ok']).then(),
            err => this.submit.nativeElement.disabled = false,
            () => this.submit.nativeElement.disabled = false
        );
        this.subscriptions.push(s);
    }
}

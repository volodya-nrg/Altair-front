import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverService} from '../../../services/recover.service';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-page-recover-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.less']
})
export class PageRecoverSenderComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private msg = 'На Ваш е-мэйл отправлен проверочный код.\nСледуйте указаниям в письме.';
    form: FormGroup;
    isProdMode: boolean = environment.production;
    @ViewChild('submitBtn', {static: true}) submitBtn: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceRecover: RecoverService,
        private router: Router,
        private serviceTitle: Title,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Восстановление пароля');

        this.form = this.fb.group({
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit() {
    }

    onSubmit({target}): void {
        if (this.form.invalid) {
            for (const key of Object.keys(this.form.controls)) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const btnSubmit = this.submitBtn.nativeElement;
        btnSubmit.disabled = true;
        const s = this.serviceRecover.sendHash(this.form.value).subscribe(
            x => {
                if (isPlatformBrowser(this.platformID)) {
                    alert(this.msg);
                }

                this.router.navigate(['/main']).then();
            },
            err => btnSubmit.disabled = false,
            () => btnSubmit.disabled = false
        );
        this.subscriptions.push(s);
    }
}

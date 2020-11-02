import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverService} from '../../../services/recover.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';
import {Title} from '@angular/platform-browser';
import {isPlatformBrowser} from '@angular/common';

@Component({
    selector: 'app-page-recover-check-hash',
    templateUrl: './check-hash.component.html',
    styleUrls: ['./check-hash.component.less']
})
export class PageRecoverCheckHashComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private msg = 'Пароль успешно изменен.';
    form: FormGroup;
    isProdMode: boolean = environment.production;
    @ViewChild('submitBtn', {static: true}) submitBtn: ElementRef;

    constructor(
        private fb: FormBuilder,
        private serviceRecover: RecoverService,
        private router: Router,
        private route: ActivatedRoute,
        private serviceTitle: Title,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        const hash: string = this.route.snapshot.paramMap.get('hash');
        this.form = this.fb.group({
            hash: [hash, [Validators.required, Validators.minLength(environment.minLenHash)]],
            password: ['', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(environment.minLenPassword)]],
        });

        this.serviceTitle.setTitle('Восстановление пароля');
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
        const s = this.serviceRecover.changePassword(this.form.value).subscribe(
            x => {
                if (isPlatformBrowser(this.platformID)) {
                    alert(this.msg);
                }

                this.router.navigate(['/login']).then();
            },
            err => btnSubmit.disabled = false,
            () => btnSubmit.disabled = false
        );
        this.subscriptions.push(s);
    }
}

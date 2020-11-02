import {AfterViewInit, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PhoneService} from '../../../../services/phone.service';
import {MyErrorService} from '../../../../services/my-error.service';
import {environment} from '../../../../../environments/environment';
import {PhoneInterface} from '../../../../interfaces/response/phone';
import {AuthService} from '../../../../services/auth.service';

@Component({
    selector: 'app-phone',
    templateUrl: './phone.component.html',
    styleUrls: ['./phone.component.less'],
})
export class PhoneComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private savePhone: string;
    private attentionMsg = 'Вы точно хотите удалить номер телефона?';
    private submitDefaultFormCreate = 'Отправить';
    isOpenForms = false;
    isOpenFormCheck = false;
    formCreate: FormGroup;
    formCheck: FormGroup;
    isProdMode: boolean = environment.production;
    phones: PhoneInterface[] = [];
    timeLockInputPhone = 0;
    @ViewChild('timeUnblock', {static: true}) timeUnblock: ElementRef;

    constructor(
        private fb: FormBuilder,
        private servicePhone: PhoneService,
        private serviceMyError: MyErrorService,
        private serviceAuth: AuthService,
        @Inject(PLATFORM_ID) private platformID: object,
    ) {
    }

    ngOnInit(): void {
        this.formCreate = this.fb.group({
            number: ['', [Validators.required, Validators.pattern(/^(7|9)\d{10,11}$/)]],
            submit: this.submitDefaultFormCreate,
        });
        this.formCheck = this.fb.group({
            code: ['', [Validators.required, Validators.minLength(5)]],
        });
        const s = this.serviceAuth.profile$.subscribe(x => {
            this.phones = (x && x.phones && x.phones.length ? x.phones : []);
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    onSubmitFormCreate({target}): void {
        if (this.formCreate.invalid) {
            for (const key of Object.keys(this.formCreate.controls)) {
                const formControl = this.formCreate.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        target.classList.add('sx-loading');
        this.formCreate.get('submit').disable();
        const s = this.servicePhone.create(this.formCreate.value).subscribe(
            x => {
                this.savePhone = x.number;
                this.isOpenFormCheck = true;
                this.formCreate.get('number').disable();
                this.formCreate.get('submit').disable();

                this.timeLockInputPhone = environment.timeSecBlockForPhoneSend;
                const x2 = setInterval(() => {
                    --this.timeLockInputPhone;

                    if (this.timeLockInputPhone < 1) {
                        clearInterval(x2);
                        this.formCreate.get('number').enable();
                        this.formCreate.get('submit').enable();
                    }
                }, 1000);
            },
            err => {
                this.serviceMyError.errors$.next({msg: err});
                target.classList.remove('sx-loading');
                this.formCreate.get('submit').enable();
            },
            () => {
                target.classList.remove('sx-loading');
            }
        );
        this.subscriptions.push(s);
    }

    onSubmitFormCheck({target}): void {
        if (this.formCheck.invalid) {
            for (const key of Object.keys(this.formCheck.controls)) {
                const formControl = this.formCheck.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const btnSubmit = target.querySelector('[type="submit"]');

        target.classList.add('sx-loading');
        btnSubmit.disabled = true;
        const s = this.servicePhone.check(this.savePhone, this.formCheck.get('code').value).subscribe(
            x => {
                this.serviceAuth.profile$.next(x);
                this.resetForms();
            },
            err => {
                this.serviceMyError.errors$.next({msg: err});
                target.classList.remove('sx-loading');
                btnSubmit.disabled = false;
            },
            () => {
                target.classList.remove('sx-loading');
                btnSubmit.disabled = false;
            }
        );
        this.subscriptions.push(s);
    }

    delPhone(index: number): void {
        if (!confirm(this.attentionMsg)) {
            return;
        }

        const s = this.servicePhone.delete(this.phones[index].number).subscribe(
            x => {
                // this.phones.splice(index, 1)
                this.serviceAuth.profile$.next(x);
            },
            err => this.serviceMyError.errors$.next({msg: err}),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    resetForms(): void {
        this.formCheck.reset();
        this.formCreate.reset();
        this.formCreate.get('submit').setValue(this.submitDefaultFormCreate);
        this.isOpenFormCheck = false;
        this.isOpenForms = false;
    }
}

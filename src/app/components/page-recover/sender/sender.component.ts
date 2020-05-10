import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverService} from '../../../services/recover.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-page-recover-sender',
    templateUrl: './sender.component.html',
    styleUrls: ['./sender.component.less']
})
export class PageRecoverSenderComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    private attentionMsg: string = 'На Ваш е-мэйл отправлен проверочный код.\nСледуйте указаниям в письме.';
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private serviceRecover: RecoverService,
        private router: Router,
    ) {
    }

    ngOnInit(): void {
        console.log('init PageRecoverComponent');

        this.form = this.fb.group({
            email: ['test@test.te', [Validators.required, Validators.email]]
        });
    }

    ngOnDestroy(): void {
        console.log('destroy PageRecoverComponent');
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
        this.serviceRecover.sendHash(this.form.value).subscribe(
            x => {
                alert(this.attentionMsg);
                this.router.navigate(['/main']).then();
            }, err => {
                btnSubmit.disabled = false;
            },
            () => {
                btnSubmit.disabled = false;
            }
        );
    }
}

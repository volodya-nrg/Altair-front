import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RecoverService} from '../../../services/recover.service';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
    selector: 'app-page-recover-check-hash',
    templateUrl: './check-hash.component.html',
    styleUrls: ['./check-hash.component.less']
})
export class PageRecoverCheckHashComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    private msg: string = 'Пароль успешно изменен.';
    form: FormGroup;
    isProdMode: boolean = environment.production;

    constructor(
        private fb: FormBuilder,
        private serviceRecover: RecoverService,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        const hash = this.route.snapshot.paramMap.get('hash');
        this.form = this.fb.group({
            hash: [hash, [Validators.required, Validators.minLength(environment.minLenHash)]],
            password: ['', [Validators.required, Validators.minLength(environment.minLenPassword)]],
            passwordConfirm: ['', [Validators.required, Validators.minLength(environment.minLenPassword)]],
        });
    }

    ngOnDestroy(): void {
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
        const s = this.serviceRecover.changePassword(this.form.value).subscribe(
            x => {
                alert(this.msg);
                this.router.navigate(['/login']).then();
            },
            err => btnSubmit.disabled = false,
            () => btnSubmit.disabled = false
        );
        this.subscriptions.push(s);
    }
}

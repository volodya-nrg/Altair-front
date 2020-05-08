import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Helpers} from '../../../helpers';
import {UserService} from '../../../services/user.service';
import {UserInterface} from '../../../interfaces/response/user';
import {AuthService} from '../../../services/auth.service';
import {ProfileService} from '../../../services/profile.service';

@Component({
    selector: 'app-page-profile-info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageProfileInfoComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    profile: UserInterface;

    constructor(
        private fb: FormBuilder,
        private serviceProfile: ProfileService,
        private serviceAuth: AuthService,
    ) {
        this.form = this.fb.group({
            name: new FormControl('', Validators.required),
        });
    }

    ngOnInit(): void {
        console.log('init page profile info');
        this.serviceAuth.profileBhSubject.subscribe(x => {
            this.profile = x;

            if (!x) {
                return;
            }

            // тут только оказывается массивы можно вставлять
            //this.form.controls.name.setValue(this.profile.name);
            this.form.patchValue({
                name: this.profile.name,
            });
        });
    }

    ngOnDestroy(): void {
        console.log('destroy page profile info');
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

        const newFormData = Helpers.getNewFormData(this.form.value);
        const btnSubmit = target.querySelector('[type="submit"]');
        btnSubmit.disabled = true;
        const s = this.serviceProfile.update(newFormData).subscribe(
            x => {
                this.serviceAuth.profileBhSubject.next(x);
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

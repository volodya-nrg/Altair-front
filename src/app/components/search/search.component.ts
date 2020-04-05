import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({
            query: ['', Validators.required]
        });
    }

    onSubmit({target}) {
        if (this.form.invalid) {
            alert('Error: not valid form');
            return;
        }
        // const submit = target.querySelector('[type="submit"]');
        // submit.disabled = true;
        // this.subscription2 = this.authService.login(this.form.value).subscribe(
        //     _ => this.router.navigate([this.returnUrl]),
        //     err => submit.disabled = false,
        //     () => submit.disabled = false
        // );
        // this.subscriptions.push(this.subscription2);
    }
}

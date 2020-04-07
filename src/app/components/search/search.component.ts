import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
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

        this.router.navigate(['/search'], {
            queryParams: this.form.value
        }).then(ok => {
            if (ok) {
                // this.form.reset();
            }
        });
    }
}

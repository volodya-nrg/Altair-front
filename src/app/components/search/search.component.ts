import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Helpers} from '../../helpers';

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
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        console.log('init serachComponent');

        this.route.queryParams.subscribe(
            params => {
                const q = params['q'];

                if (q) {
                    this.form.setValue({
                        q: q
                    });
                }
            },
            err => Helpers.handleErr(err),
            () => {
            }
        );

        this.form = this.fb.group({
            q: new FormControl('')
        });
    }

    onSubmit({target}) {
        this.router.navigate(['/search'], {
            queryParams: this.form.value
        });
    }
}

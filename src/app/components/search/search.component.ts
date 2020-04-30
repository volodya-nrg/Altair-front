import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Helpers} from '../../helpers';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
    ) {
    }

    ngOnInit(): void {
        console.log('init serachComponent');

        const s = this.route.queryParams.subscribe(
            params => {
                const q = params['q'];

                if (q) {
                    this.form.setValue({q: q});
                }
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);

        this.form = this.fb.group({
            q: new FormControl('')
        });
    }

    ngOnDestroy(): void {
        console.log('destroy searchCopm');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    onSubmit({target}) {
        this.router.navigate(['/search'], {
            queryParams: this.form.value
        });
    }
}

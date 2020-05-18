import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {SearchService} from '../../services/search.service';
import {MyErrorService} from '../../services/my-error.service';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.less'],
})
export class SearchComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private serviceSearch: SearchService,
        private serviceMyError: MyErrorService,
    ) {
    }

    ngOnInit(): void {
        const s1 = this.route.queryParams.subscribe(
            x => {
                const q = x['q'];

                if (!q) {
                    return;
                }

                this.form.setValue({q: q});
            },
            err => this.serviceMyError.errors$.next({msg: err}),
            () => {
            }
        );
        this.subscriptions.push(s1);

        this.form = this.fb.group({
            q: ''
        });

        const s2 = this.serviceSearch.watchForReset.subscribe(x => this.reset());
        this.subscriptions.push(s2);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    onSubmit() {
        this.router.navigate(['/search'], {
            queryParams: this.form.value
        }).then();
    }

    reset(): void {
        this.form.reset();
    }
}

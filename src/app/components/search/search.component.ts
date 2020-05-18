import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Helpers} from '../../helpers';
import {Subscription} from 'rxjs';
import {SearchService} from '../../services/search.service';

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
    ) {
    }

    ngOnInit(): void {
        const s1 = this.route.queryParams.subscribe(
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
        this.subscriptions.push(s1);

        this.form = this.fb.group({
            q: new FormControl('')
        });

        const s2 = this.serviceSearch.watchForReset.subscribe(_ => this.reset());
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

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.less'],
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    items: BreadcrumbsInterface[] = [];
    isLoading: boolean = false;

    constructor(
        private serviceBreadcrumbs: BreadcrumbsService,
    ) {
    }

    ngOnInit(): void {
        this.isLoading = true;
        const s = this.serviceBreadcrumbs.sender$.subscribe(x => {
            this.items = x;
            this.isLoading = false;
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

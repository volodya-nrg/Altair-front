import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';

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
        private serviceBreadcrumbs: BreadcrumbsService
    ) {
    }

    ngOnInit(): void {
        console.log('init breadcrumbsComponent');

        this.isLoading = true;
        const s = this.serviceBreadcrumbs.bhSubject.subscribe(
            x => {
                this.items = x;
            },
            err => {
                Helpers.handleErr(err.error);
                this.isLoading = false;
            },
            () => {
                this.isLoading = false;
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy breadcrumbsComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

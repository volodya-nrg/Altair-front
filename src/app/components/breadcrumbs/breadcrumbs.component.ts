import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    items: BreadcrumbsInterface[] = [];

    constructor(
        private serviceBreadcrumbs: BreadcrumbsService
    ) {
    }

    ngOnInit(): void {
        console.log('init breadcrumbsComponent');
        const s = this.serviceBreadcrumbs.bhSubject.subscribe(
            x => this.items = x,
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy breadcrumbsComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

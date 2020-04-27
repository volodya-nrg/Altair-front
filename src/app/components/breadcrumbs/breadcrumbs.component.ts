import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';
import {BreadcrumbsService} from '../../services/breadcrumbs.service';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.less']
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
        const s = this.serviceBreadcrumbs.bhSubject.subscribe(x => this.items = x);
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy breadcrumbsComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

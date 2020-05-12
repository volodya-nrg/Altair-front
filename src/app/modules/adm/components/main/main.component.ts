import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    jsonResult: Object;

    constructor() {
    }

    ngOnInit(): void {
        console.log('init adm');
    }

    ngOnDestroy(): void {
        console.log('destroy adm');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

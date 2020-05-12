import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {Helpers} from '../../../../helpers';
import {ManagerService} from '../../../../services/manager.service';
import {CatTreeInterface} from '../../../../interfaces/response/cat';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    jsonResult: Object;
    pointerOnCatTree: CatTreeInterface;
    constructor(
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm');

        const s = this.serviceManager.settings$.subscribe(
            x => {
                this.pointerOnCatTree = x.catsTree;
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        console.log('destroy adm');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

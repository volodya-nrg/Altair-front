import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {ManagerService} from '../../services/manager.service';
import {Helpers} from '../../helpers';

@Component({
    selector: 'app-page-adm',
    templateUrl: './page-adm.component.html',
    styleUrls: ['./page-adm.component.less'],
})
export class PageAdmComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    jsonResult: Object;
    pointerOnCatTree: CatTreeInterface;

    constructor(
        private serviceManager: ManagerService,
    ) {
    }

    ngOnInit(): void {
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
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

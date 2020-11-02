import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {CatTreeInterface} from '../../../../interfaces/response/cat';
import {ManagerService} from '../../../../services/manager.service';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-adm',
    templateUrl: './page-adm.component.html',
    styleUrls: ['./page-adm.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageAdmComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    jsonResult: object;
    catTree: CatTreeInterface;

    constructor(
        private serviceManager: ManagerService,
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        document.body.classList.add('sx-adm');
        const s = this.serviceManager.settings$.subscribe(x => this.catTree = x.catsTree);
        this.subscriptions.push(s);

        this.serviceTitle.setTitle('Администрирование');
    }

    ngOnDestroy(): void {
        document.body.classList.remove('sx-adm');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

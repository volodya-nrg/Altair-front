import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {SettingsService} from '../../services/settings.service';
import {Subscription} from 'rxjs';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {BreadcrumbsInterface} from '../../interfaces/breadcrumbs';

@Component({
    selector: 'app-breadcrumbs',
    templateUrl: './breadcrumbs.component.html',
    styleUrls: ['./breadcrumbs.component.less']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private subscriptions: Subscription[] = [];
    private first: BreadcrumbsInterface;
    items: BreadcrumbsInterface[] = [];
    @Input('curCatId') curCatId: number;

    constructor(
        private settingsService: SettingsService
    ) {
        this.first = {
            name: 'Каталог',
            slug: 'cat',
        };
    }

    ngOnInit(): void {
        console.log('init BreadcrumbsComponent');
        this.subscription = this.settingsService.settings.subscribe(x => this.start());
        this.subscriptions.push(this.subscription);
    }

    ngOnDestroy(): void {
        console.log('destroy BreadcrumbsComponent');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    start(): void {
        this.walk(this.settingsService.catsTree.childes, this.curCatId, this.items, 0);
    }

    walk(listCatTree: CatTreeInterface[], findCatId: number, receiver: BreadcrumbsInterface[], deep: number): boolean {
        for (let i = 0; i < listCatTree.length; i++) {
            const cat = listCatTree[i];

            if (cat.catId === findCatId) {
                receiver.push({name: cat.name, slug: cat.slug});
                return true;
            }
            if (cat.childes && cat.childes.length) {
                let res = this.walk(cat.childes, findCatId, receiver, deep + 1);

                if (res) {
                    receiver.push({name: cat.name, slug: cat.slug});

                    if (!deep) {
                        receiver.push(this.first);
                        receiver = receiver.reverse();

                        let a = '/';
                        for (let j = 0; j < receiver.length; j++) {
                            const b = '/' + receiver[j].slug;
                            receiver[j].slug = a + b;
                            a += b;
                        }
                    }

                    return res;
                }
            }
        }

        return false;
    }
}

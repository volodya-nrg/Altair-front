import {Component, OnDestroy, OnInit} from '@angular/core';
import {CatService} from '../../services/cat.service';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-page-add',
    templateUrl: './page-add.component.html',
    styleUrls: ['./page-add.component.less']
})
export class PageAddComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface; // основа
    aCols: CatTreeInterface[] = []; // динамическая переменная

    constructor(
        private catService: CatService
    ) {
    }

    ngOnInit(): void {
        this.subscription = this.catService.getTree(false).subscribe(x => {
            this.catTree = x;
            this.aCols.push(x);
        });
        this.subscriptions.push(this.subscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    showSubCat({target}, cat: CatTreeInterface): void {
        const curDeepLevel = this.getDeepLevel(cat.catId);
        const hasChildes = cat.childes && cat.childes.length;
        this.aCols.length = curDeepLevel + 1; // обрежим массив до нужного состояния

        // childes может быть null-ом
        if (hasChildes) {
            this.aCols.push(cat);
        }

        const brothers = target.parentNode.querySelectorAll('li.sx-active');

        for (let elem of brothers) {
            elem.classList.remove('sx-active');
        }
        target.classList.add('sx-active');

        if (!hasChildes) {
            // тут делаем запрос - cat.catId
        }
    }

    getDeepLevel(catId: number): number {
        let result = 0;

        for (let i = 0; i < this.aCols.length; i++) {
            const col = this.aCols[i];
            result = i;

            for (let j = 0; j < col.childes.length; j++) {
                var cat = col.childes[j];

                if (cat.catId === catId) {
                    return result;
                }
            }
        }

        return result;
    }
}

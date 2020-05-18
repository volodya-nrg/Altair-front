import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {ManagerService} from '../../services/manager.service';
import {Helpers} from '../../helpers';
import {Subscription} from 'rxjs';
import {EmitCatsHorizAccordionInterface} from '../../interfaces/emit-cats-horiz-accordion';

@Component({
    selector: 'app-cats-horiz-accordion',
    templateUrl: './cats-horiz-accordion.component.html',
    styleUrls: ['./cats-horiz-accordion.component.less'],
})
export class CatsHorizAccordionComponent implements OnInit, OnDestroy, AfterViewInit {
    private subscriptions: Subscription[] = [];
    private catTree: CatTreeInterface;
    aCols: CatTreeInterface[] = []; // динамическая переменная

    @Output() onSelectLeaf: EventEmitter<EmitCatsHorizAccordionInterface> = new EventEmitter();
    @ViewChild('catCols', {static: true}) catCols: ElementRef;

    constructor(
        private managerSettings: ManagerService,
        private changeDetection: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        console.log('init CatsHorizAccordionComponent');

        const s1 = this.managerSettings.settings$.subscribe(
            x => {
                this.catTree = x.catsTree;
                this.aCols.push(this.catTree); // по умолчанию вставим первый иерархию каталога
            },
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s1);
    }

    ngOnDestroy(): void {
        console.log('destroy CatsHorizAccordionComponent');
    }

    ngAfterViewInit(): void {
    };

    render(catId: number, isResetFormOnParent: boolean, event): void {
        if (event && event.target.classList.contains('sx-active')) {
            return;
        }

        this.reset();
        this.aCols.length = 0;
        this.aCols = [this.catTree];
        let tmpCats = this.getArrayAncestorsCatTree(this.catTree, catId, isResetFormOnParent).reverse();
        let ids: number[] = [catId];

        tmpCats.forEach(tmpCat => {
            if (tmpCat.childes && tmpCat.childes.length) {
                this.aCols.push(tmpCat);
            }

            ids.push(tmpCat.catId);
        });

        this.changeDetection.detectChanges();

        ids.forEach(id => {
            const el = this.catCols.nativeElement.querySelector('.cats-horiz-accordion_col_' + id);

            el ? el.classList.add('sx-active') : console.log('Не найден элемент:', id);
        });
    }

    reset(): void {
        this.aCols.length = 0;
        this.aCols = [this.catTree];
        this.catCols.nativeElement.querySelectorAll('.sx-active')
            .forEach(x => x.classList.remove('sx-active'));
    }

    private getArrayAncestorsCatTree(catTree: CatTreeInterface, catId: number, isResetFormOnParent: boolean): CatTreeInterface[] {
        let result: CatTreeInterface[] = [];

        for (let i = 0; i < catTree.childes.length; i++) {
            const cat = catTree.childes[i];

            if (cat.catId === catId) {
                result.push(cat);

                if (!cat.childes || !cat.childes.length) {
                    this.onSelectLeaf.emit({
                        cat: cat,
                        reset: isResetFormOnParent,
                    });
                }

                return result;
            }
            if (cat.childes && cat.childes.length) {
                result = this.getArrayAncestorsCatTree(cat, catId, isResetFormOnParent);

                if (result.length) {
                    result.push(cat);
                    return result;
                }
            }
        }

        return result;
    }
}

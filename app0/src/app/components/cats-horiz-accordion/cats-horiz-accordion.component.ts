import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {CatTreeInterface} from '../../interfaces/response/cat';
import {ManagerService} from '../../services/manager.service';
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
    isLoading = true;
    @Output() selectLeaf: EventEmitter<EmitCatsHorizAccordionInterface> = new EventEmitter();
    @ViewChild('catCols', {static: true}) catCols: ElementRef;

    constructor(
        private managerSettings: ManagerService,
        private changeDetection: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        const s = this.managerSettings.settings$.subscribe(x => {
            this.catTree = x.catsTree;
            this.aCols.push(this.catTree); // по умолчанию вставим первый иерархию каталога
            this.isLoading = false;
        });
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    ngAfterViewInit(): void {
    }

    render(catID: number, event): void {
        if (event && event.target.classList.contains('sx-active')) {
            return;
        }

        this.reset();
        this.aCols.length = 0;
        this.aCols = [this.catTree];
        const tmpCats = this.getArrayAncestorsCatTree(this.catTree, catID, event).reverse();
        const IDs: number[] = [catID];

        tmpCats.forEach(tmpCat => {
            if (tmpCat.childes && tmpCat.childes.length) {
                this.aCols.push(tmpCat);
            }

            IDs.push(tmpCat.catID);
        });

        this.changeDetection.detectChanges();

        IDs.forEach(ID => this.catCols.nativeElement
            .querySelector('.cats-horiz-accordion_col_' + ID)
            .classList.add('sx-active'));
    }

    reset(): void {
        this.aCols.length = 0;
        this.aCols = [this.catTree];

        this.catCols
            .nativeElement
            .querySelectorAll('.sx-active')
            .forEach(x => x.classList.remove('sx-active'));
    }

    private getArrayAncestorsCatTree(catTree: CatTreeInterface, catID: number, eventSrc: Event): CatTreeInterface[] {
        let result: CatTreeInterface[] = [];

        for (const cat of catTree.childes) {
            if (cat.catID === catID) {
                result.push(cat);

                // если быбирается нативно и это лист, то уведомляем назад. Иначе уведомление не даем.
                if ((!cat.childes || !cat.childes.length) && eventSrc) {
                    this.selectLeaf.emit({
                        cat,
                    });
                }

                return result;
            }
            if (cat.childes && cat.childes.length) {
                result = this.getArrayAncestorsCatTree(cat, catID, eventSrc);

                if (result.length) {
                    result.push(cat);
                    return result;
                }
            }
        }

        return result;
    }
}

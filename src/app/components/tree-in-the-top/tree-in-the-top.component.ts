import {Component, Input, ViewEncapsulation} from '@angular/core';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-tree-in-the-top',
    templateUrl: './tree-in-the-top.component.html',
    styleUrls: ['./tree-in-the-top.component.less'],
})
export class TreeInTheTopComponent {
    @Input() catTree: CatTreeInterface;
    @Input() url: string;

    constructor() {
    }

    showChildes({target}): void {
        this.closeAll(target);
        target.classList.add('sx-active');
    }

    closeAll(target: HTMLBaseElement): void {
        target.closest('ul')
            .querySelectorAll('.sx-active')
            .forEach(x => x.classList.remove('sx-active'));
    }
}

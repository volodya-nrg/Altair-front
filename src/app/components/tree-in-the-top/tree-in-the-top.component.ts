import {Component, Input} from '@angular/core';
import {CatTreeInterface} from '../../interfaces/response/cat';

@Component({
    selector: 'app-tree-in-the-top',
    templateUrl: './tree-in-the-top.component.html',
    styleUrls: ['./tree-in-the-top.component.less']
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
        var grandFather = target.closest('ul');
        var matches: HTMLBaseElement[] = Array.from(grandFather.querySelectorAll('.sx-active'));
        for (let elem of matches) {
            elem.classList.remove('sx-active');
        }
    }
}
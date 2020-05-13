import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-block-prop',
    templateUrl: './block-prop.component.html',
    styleUrls: ['./block-prop.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class BlockPropComponent implements OnInit {
    @Input() index: number;
    @Input() prop: FormGroup;
    @Output() removed: EventEmitter<number> = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit(): void {
    }
}

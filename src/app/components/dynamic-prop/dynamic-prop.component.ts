import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-prop',
    templateUrl: './dynamic-prop.component.html',
    styleUrls: ['./dynamic-prop.component.less'],
})
export class DynamicPropComponent {
    @Input() index: number;
    @Input() prop: FormGroup;
    @Output() removed: EventEmitter<number> = new EventEmitter<number>();
}

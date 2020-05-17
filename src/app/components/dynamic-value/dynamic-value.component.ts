import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-value',
    templateUrl: './dynamic-value.component.html',
    styleUrls: ['./dynamic-value.component.less'],
})
export class DynamicValueComponent {
    @Input() index: number;
    @Input() value: FormGroup;
    @Output() removed: EventEmitter<number> = new EventEmitter<number>();
}

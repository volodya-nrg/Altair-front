import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-value',
    templateUrl: './dynamic-value.component.html',
    styleUrls: ['./dynamic-value.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamicValueComponent implements OnInit {
    @Input() index: number;
    @Input() value: FormGroup;
    @Output() removed: EventEmitter<number> = new EventEmitter<number>();
}

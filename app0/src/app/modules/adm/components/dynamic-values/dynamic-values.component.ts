import {Component, Input} from '@angular/core';
import {FormArray, FormBuilder} from '@angular/forms';
import {ValuePropInterface} from '../../../../interfaces/response/value-prop';

@Component({
    selector: 'app-dynamic-values',
    templateUrl: './dynamic-values.component.html',
    styleUrls: ['./dynamic-values.component.less'],
})
export class DynamicValuesComponent {
    values: ValuePropInterface[] = [];
    @Input() propID: number;
    @Input() valuesFormArray: FormArray;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    addItem(): void {
        this.valuesFormArray.push(this.fb.group({
            valueID: 0,
            title: '',
            pos: this.valuesFormArray.length + 1,
            propID: this.propID,
        }));
    }
}

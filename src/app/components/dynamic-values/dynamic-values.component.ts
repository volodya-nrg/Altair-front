import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';
import {ValuePropInterface} from '../../interfaces/response/value-prop';

@Component({
    selector: 'app-dynamic-values',
    templateUrl: './dynamic-values.component.html',
    styleUrls: ['./dynamic-values.component.less'],
})
export class DynamicValuesComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    values: ValuePropInterface[] = [];
    @Input() propId: number;
    @Input() valuesFormArray: FormArray;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm dynamic values');
    }

    ngOnDestroy(): void {
        console.log('destroy adm dynamic values');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    addItem(): void {
        this.valuesFormArray.push(this.fb.group({
            valueId: 0,
            title: '',
            pos: this.valuesFormArray.length + 1,
            propId: this.propId,
        }));
    }
}

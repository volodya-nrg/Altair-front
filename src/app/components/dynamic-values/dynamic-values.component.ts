import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormArray, FormBuilder} from '@angular/forms';

@Component({
    selector: 'app-dynamic-values',
    templateUrl: './dynamic-values.component.html',
    styleUrls: ['./dynamic-values.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamicValuesComponent implements OnInit, OnDestroy, AfterViewInit {
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

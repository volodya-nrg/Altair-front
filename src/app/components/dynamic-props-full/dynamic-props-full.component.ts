import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-props-full',
    templateUrl: './dynamic-props-full.component.html',
    styleUrls: ['./dynamic-props-full.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamicPropsFullComponent {
    @Input() propsFullFormArray: FormArray;
    @Input() outerForm: FormGroup;
}

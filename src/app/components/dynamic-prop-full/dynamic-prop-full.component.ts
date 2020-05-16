import {Component, Input, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-dynamic-prop-full',
    templateUrl: './dynamic-prop-full.component.html',
    styleUrls: ['./dynamic-prop-full.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class DynamicPropFullComponent {
    @Input() myGroup: FormGroup;

    constructor() {
    }

    convertToInt(str: string): number {
        return parseInt(str, 10) || 0;
    }

    addPhoto({target}): void {
        // this.transferFiles.emit(target.files);
        // if (target.files.length) {
        //     this.form.markAsDirty();
        // }
        // this.form.patchValue({
        //     files: target.files
        // });
    }
}

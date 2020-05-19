import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {KindPropsService} from '../../../../../services/kind-props.service';

@Component({
    selector: 'app-forms-kind-props-get-all',
    templateUrl: './forms-kind-props-get-all.component.html',
    styleUrls: ['./forms-kind-props-get-all.component.less'],
})
export class FormsKindPropsGetAllComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceKindProps: KindPropsService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({});
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        const s = this.serviceKindProps.getAll().subscribe(x => this.json.emit(x));
        this.subscriptions.push(s);
    }
}

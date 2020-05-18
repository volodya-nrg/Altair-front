import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Helpers} from '../../helpers';
import {TestService} from '../../services/test.service';

@Component({
    selector: 'app-forms-test',
    templateUrl: './forms-test.component.html',
    styleUrls: ['./forms-test.component.less'],
})
export class FormsTestComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    form: FormGroup;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceTest: TestService,
    ) {
    }

    ngOnInit(): void {
        this.form = this.fb.group({});
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        const s = this.serviceTest.request().subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

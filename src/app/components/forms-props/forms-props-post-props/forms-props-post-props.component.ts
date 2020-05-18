import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ManagerService} from '../../../services/manager.service';
import {Helpers} from '../../../helpers';
import {PropService} from '../../../services/prop.service';
import {KindPropInterface} from '../../../interfaces/response/kind-prop';
import {ValuePropInterface} from '../../../interfaces/response/value-prop';

@Component({
    selector: 'app-forms-props-post-props',
    templateUrl: './forms-props-post-props.component.html',
    styleUrls: ['./forms-props-post-props.component.less'],
})
export class FormsPropsPostPropsComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    kindProps: KindPropInterface[] = [];
    values: ValuePropInterface[] = [];
    form: FormGroup;
    defaultControls: Object = {};
    curKindPropName: string;
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor(
        private fb: FormBuilder,
        private serviceProps: PropService,
        private serviceManager: ManagerService,
    ) {
        this.defaultControls = {
            propId: 0, // необходимо для назначеных значений
            title: ['', Validators.required],
            kindPropId: [0, [Validators.required, Validators.min(0)]],
            name: ['', Validators.required],
            suffix: '',
            comment: '',
            privateComment: '',
            selectAsTextarea: '',
            values: this.fb.array(this.values),
        };
    }

    ngOnInit(): void {
        this.form = this.fb.group(this.defaultControls);
        this.form.get('kindPropId').valueChanges.subscribe(x => {
            this.curKindPropName = '';

            this.kindProps.forEach(y => {
                if (y.kindPropId == x) {
                    this.curKindPropName = y.name;
                }
            });
        });

        const s = this.serviceManager.settings$.subscribe(
            x => this.kindProps = x.kindProps,
            err => Helpers.handleErr(err.error),
            () => {
            }
        );
        this.subscriptions.push(s);
    }

    ngOnDestroy(): void {
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    submitForm({target}): void {
        if (this.form.invalid) {
            for (let key in this.form.controls) {
                const formControl = this.form.get(key);

                if (formControl.status === 'INVALID') {
                    console.log('INVALID:', key);
                }
            }
            return;
        }

        const s = this.serviceProps.create(this.form.value).subscribe(
            x => this.json.emit(x),
            err => Helpers.handleErr(err),
            () => {
            },
        );
        this.subscriptions.push(s);
    }
}

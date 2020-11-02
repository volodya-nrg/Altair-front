import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';

@Component({
    selector: 'app-forms-props-post-props',
    templateUrl: './forms-props-post-props.component.html',
    styleUrls: ['./forms-props-post-props.component.less'],
})
export class FormsPropsPostPropsComponent implements OnInit, OnDestroy {
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnDestroy(): void {
    }
}

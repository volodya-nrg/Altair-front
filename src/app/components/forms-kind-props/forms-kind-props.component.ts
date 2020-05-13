import {Component, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-forms-kind-props',
    templateUrl: './forms-kind-props.component.html',
    styleUrls: ['./forms-kind-props.component.less']
})
export class FormsKindPropsComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    // formGetCats: FormGroup;
    // formGetCatsCatId: FormGroup;
    // formPostCats: FormGroup;
    // formPutCatsCatId: FormGroup;
    // formDeleteCatsCatId: FormGroup;
    @Output() json: any;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm cats');
    }

    ngOnDestroy(): void {
        console.log('destroy adm cats');
        this.subscriptions.forEach(x => x.unsubscribe());
    }
}

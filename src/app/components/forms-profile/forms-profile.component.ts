import {Component, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-forms-profile',
    templateUrl: './forms-profile.component.html',
    styleUrls: ['./forms-profile.component.less']
})
export class FormsProfileComponent implements OnInit {
    private subscriptions: Subscription[] = [];
    // formGetCats: FormGroup;
    // formGetCatsCatId: FormGroup;
    // formPostCats: FormGroup;
    // formPutCatsCatId: FormGroup;
    // formDeleteCatsCatId: FormGroup;
    @Output() json: JSON;

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
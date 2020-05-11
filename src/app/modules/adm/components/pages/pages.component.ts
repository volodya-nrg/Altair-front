import {Component, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-pages',
    templateUrl: './pages.component.html',
    styleUrls: ['./pages.component.less']
})
export class PagesComponent implements OnInit {
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

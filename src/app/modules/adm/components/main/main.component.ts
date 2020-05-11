import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
    styleUrls: ['./main.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class MainComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];
    formGetCats: FormGroup;
    jsonResult: JSON;

    constructor(
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        console.log('init adm');
    }

    ngOnDestroy(): void {
        console.log('destroy adm');
        this.subscriptions.forEach(x => x.unsubscribe());
    }

    receiverJson(data: JSON): void {
        this.jsonResult = data;
    }
}

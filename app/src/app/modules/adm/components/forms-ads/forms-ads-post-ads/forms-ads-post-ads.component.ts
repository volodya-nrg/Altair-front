import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-forms-ads-post-ads',
    templateUrl: './forms-ads-post-ads.component.html',
    styleUrls: ['./forms-ads-post-ads.component.less'],
})
export class FormsAdsPostAdsComponent {
    @Output() json: EventEmitter<any> = new EventEmitter();

    constructor() {
    }
}

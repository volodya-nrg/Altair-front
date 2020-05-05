import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
    selector: 'app-page-profile-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less'],
    encapsulation: ViewEncapsulation.None,
})
export class PageProfileSettingsComponent implements OnInit, OnDestroy {

    constructor() {
    }

    ngOnInit(): void {
        console.log('init page profile settings');
    }

    ngOnDestroy(): void {
        console.log('destroy page profile settings');
    }
}

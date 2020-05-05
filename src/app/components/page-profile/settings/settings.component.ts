import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
    selector: 'app-page-profile-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less']
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

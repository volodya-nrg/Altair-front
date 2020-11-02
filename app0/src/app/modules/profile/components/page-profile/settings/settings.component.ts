import {Component, OnInit} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Component({
    selector: 'app-page-profile-settings',
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.less'],
})
export class PageProfileSettingsComponent implements OnInit {
    constructor(
        private serviceTitle: Title,
    ) {
    }

    ngOnInit(): void {
        this.serviceTitle.setTitle('Профиль: настройки');
    }
}

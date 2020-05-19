import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {PageProfileComponent} from './components/page-profile/page-profile.component';
import {PageProfileSettingsComponent} from './components/page-profile/settings/settings.component';
import {PageProfileInfoComponent} from './components/page-profile/info/info.component';
import {PageProfileAdsComponent} from './components/page-profile/ads/ads.component';
import {ProfileRoutingModule} from './profile-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        PageProfileComponent,
        PageProfileInfoComponent,
        PageProfileSettingsComponent,
        PageProfileAdsComponent,
    ],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        ProfileRoutingModule,
        SharedModule,
    ]
})
export class ProfileModule {
}

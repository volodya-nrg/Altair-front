import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {PageProfileComponent} from './components/page-profile/page-profile.component';
import {PageProfileInfoComponent} from './components/page-profile/info/info.component';
import {PageProfileSettingsComponent} from './components/page-profile/settings/settings.component';
import {PageProfileAdsComponent} from './components/page-profile/ads/ads.component';

const routes: Routes = [
    {path: '', redirectTo: 'info', pathMatch: 'full'},
    {
        path: '', component: PageProfileComponent, children: [
            {path: 'info', component: PageProfileInfoComponent},
            {path: 'settings', component: PageProfileSettingsComponent},
            {path: 'ads', component: PageProfileAdsComponent},
        ]
    },
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProfileRoutingModule {
}

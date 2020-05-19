import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageMainComponent} from './components/page-main/page-main.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageAdComponent} from './components/page-ad/page-ad.component';
import {PageCatComponent} from './components/page-cat/page-cat.component';
import {PageSearchComponent} from './components/page-search/page-search.component';
import {PageRegisterComponent} from './components/page-register/page-register.component';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {PageProfileComponent} from './components/page-profile/page-profile.component';
import {PageRegisterOkComponent} from './components/page-register/ok/ok.component';
import {PageProfileInfoComponent} from './components/page-profile/info/info.component';
import {PageProfileSettingsComponent} from './components/page-profile/settings/settings.component';
import {PageProfileAdsComponent} from './components/page-profile/ads/ads.component';
import {PageAdCreateEditComponent} from './components/page-ad-create-edit/page-ad-create-edit.component';
import {PageRecoverSenderComponent} from './components/page-recover/sender/sender.component';
import {PageRecoverCheckHashComponent} from './components/page-recover/check-hash/check-hash.component';
import {PageCheckEmailThroughHashComponent} from './components/page-check-email-through-hash/page-check-email-through-hash.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: PageMainComponent},
    {
        path: 'cat', children: [
            {path: '**', component: PageCatComponent},
        ]
    },
    {
        path: 'ad', children: [
            {path: 'create', component: PageAdCreateEditComponent},
            {path: 'edit/:adId', component: PageAdCreateEditComponent},
            {path: ':slug', component: PageAdComponent},
        ]
    },
    {path: 'search', component: PageSearchComponent},
    {
        path: 'register', children: [
            {path: 'ok', component: PageRegisterOkComponent},
            {path: '', component: PageRegisterComponent},
        ]
    },
    {path: 'login', component: PageLoginComponent},
    {path: 'check-email-through/:hash', component: PageCheckEmailThroughHashComponent},
    {path: 'profile', redirectTo: 'profile/info', pathMatch: 'full'},
    {
        path: 'profile', component: PageProfileComponent, children: [
            {path: 'info', component: PageProfileInfoComponent},
            {path: 'settings', component: PageProfileSettingsComponent},
            {path: 'ads', component: PageProfileAdsComponent},
        ]
    },
    {path: 'recover', redirectTo: 'recover/sender', pathMatch: 'full'},
    {
        path: 'recover', children: [
            {path: 'sender', component: PageRecoverSenderComponent}, // страница отправления хеша
            {path: 'check/:hash', component: PageRecoverCheckHashComponent}, // стр. смены пароля
        ]
    },
    {path: 'adm', loadChildren: () => import('./modules/adm/adm.module').then(m => m.AdmModule)},
    {path: 'info', loadChildren: () => import('./modules/info/info.module').then(m => m.InfoModule)},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageMainComponent} from './components/page-main/page-main.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageAddComponent} from './components/page-add/page-add.component';
import {PageAdComponent} from './components/page-ad/page-ad.component';
import {PageCatComponent} from './components/page-cat/page-cat.component';
import {PageSearchComponent} from './components/page-search/page-search.component';
import {PageRegisterComponent} from './components/page-register/page-register.component';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {PageProfileComponent} from './components/page-profile/page-profile.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: PageMainComponent},
    {
        path: 'cat', children: [
            {path: '**', component: PageCatComponent},
        ]
    },
    {path: 'ad/:slug', component: PageAdComponent},
    {path: 'add', component: PageAddComponent},
    {path: 'search', component: PageSearchComponent},
    {path: 'register', component: PageRegisterComponent},
    {path: 'login', component: PageLoginComponent},
    {path: 'profile', component: PageProfileComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

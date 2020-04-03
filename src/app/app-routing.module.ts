import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageMainComponent} from './components/page-main/page-main.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageCatComponent} from './components/page-cat/page-cat.component';
import {PageAddComponent} from './components/page-add/page-add.component';
import {PageAdSlugComponent} from './components/page-ad-slug/page-ad-slug.component';

const routes: Routes = [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: PageMainComponent},
    {path: 'cat', component: PageCatComponent},
    {path: 'ad/:slug', component: PageAdSlugComponent},
    {path: 'add', component: PageAddComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

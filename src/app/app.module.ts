import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageMainComponent} from './components/page-main/page-main.component';
import {PageCatComponent} from './components/page-cat/page-cat.component';
import {PageAddComponent} from './components/page-add/page-add.component';
import {PageAdComponent} from './components/page-ad/page-ad.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {NavComponent} from './components/nav/nav.component';
import {SearchComponent} from './components/search/search.component';
import {AdComponent} from './components/ad/ad.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        PageMainComponent,
        PageCatComponent,
        PageAddComponent,
        PageAdComponent,
        FooterComponent,
        HeaderComponent,
        NavComponent,
        SearchComponent,
        AdComponent,
        SafeHtmlPipe,
        BreadcrumbsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

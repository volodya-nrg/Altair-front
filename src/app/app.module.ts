import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageMainComponent} from './components/page-main/page-main.component';
import { PageCatComponent } from './components/page-cat/page-cat.component';
import { PageAddComponent } from './components/page-add/page-add.component';
import { PageAdSlugComponent } from './components/page-ad-slug/page-ad-slug.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        PageMainComponent,
        PageCatComponent,
        PageAddComponent,
        PageAdSlugComponent,
        FooterComponent,
        HeaderComponent,
        NavComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

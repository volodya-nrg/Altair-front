import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

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
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {PageSearchComponent} from './components/page-search/page-search.component';
import {SettingsService} from './services/settings.service';
import {PreloaderComponent} from './components/preloader/preloader.component';
import {MyCurrencyPipe} from './pipes/my-currency.pipe';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TreeInTheTopComponent} from './components/tree-in-the-top/tree-in-the-top.component';
import {ModalComponent} from './components/modal/modal.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {PageRegisterComponent} from './components/page-register/page-register.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {PageProfileComponent} from './components/page-profile/page-profile.component';
import {PageRegisterOkComponent} from './components/page-register/ok/ok.component';

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
        PageSearchComponent,
        PreloaderComponent,
        MyCurrencyPipe,
        NotFoundComponent,
        TreeInTheTopComponent,
        ModalComponent,
        CarouselComponent,
        PageRegisterComponent,
        PageLoginComponent,
        PageProfileComponent,
        PageRegisterOkComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (settings: SettingsService) => () => settings.load(),
            deps: [SettingsService],
            multi: true
        },
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

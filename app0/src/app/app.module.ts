import {BrowserModule, Title} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {PageMainComponent} from './components/page-main/page-main.component';
import {PageCatComponent} from './components/page-cat/page-cat.component';
import {PageAdComponent} from './components/page-ad/page-ad.component';
import {PageAdCreateEditComponent} from './components/page-ad-create-edit/page-ad-create-edit.component';
import {FooterComponent} from './components/footer/footer.component';
import {HeaderComponent} from './components/header/header.component';
import {TopMenuCatsTreeComponent} from './components/top-menu-cats-tree/top-menu-cats-tree.component';
import {SearchComponent} from './components/search/search.component';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {PageSearchComponent} from './components/page-search/page-search.component';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {TreeInTheTopComponent} from './components/tree-in-the-top/tree-in-the-top.component';
import {ModalComponent} from './components/modal/modal.component';
import {CarouselComponent} from './components/carousel/carousel.component';
import {PageRegisterComponent} from './components/page-register/page-register.component';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import {ErrorInterceptor} from './interceptors/error.interceptor';
import {PageLoginComponent} from './components/page-login/page-login.component';
import {PageRegisterOkComponent} from './components/page-register/ok/ok.component';
import {AuthService} from './services/auth.service';
import {ManagerService} from './services/manager.service';
import {CatsHorizAccordionComponent} from './components/cats-horiz-accordion/cats-horiz-accordion.component';
import {PageRecoverSenderComponent} from './components/page-recover/sender/sender.component';
import {PageRecoverCheckHashComponent} from './components/page-recover/check-hash/check-hash.component';
import {ErrorsFlyComponent} from './components/errors-fly/errors-fly.component';
import {PageCheckEmailThroughHashComponent} from './components/page-check-email-through-hash/page-check-email-through-hash.component';
import {SharedModule} from './modules/shared/shared.module';
import {LoginComponent} from './components/login/login.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LocalStorageService} from './services/local-storage.service';
import {SocAuthComponent} from './components/soc-auth/soc-auth.component';
import {SocShareComponent} from './components/soc-share/soc-share.component';

@NgModule({
    declarations: [
        AppComponent,
        BreadcrumbsComponent,
        CarouselComponent,
        CatsHorizAccordionComponent,
        ErrorsFlyComponent,
        FooterComponent,
        HeaderComponent,
        LoginComponent,
        ModalComponent,
        NotFoundComponent,
        PageAdComponent,
        PageAdCreateEditComponent,
        PageCatComponent,
        PageCheckEmailThroughHashComponent,
        PageLoginComponent,
        PageMainComponent,
        PageNotFoundComponent,
        PageRecoverCheckHashComponent,
        PageRecoverSenderComponent,
        PageRegisterComponent,
        PageRegisterOkComponent,
        PageSearchComponent,
        SearchComponent,
        TopMenuCatsTreeComponent,
        TreeInTheTopComponent,
        SocAuthComponent,
        SocShareComponent,
    ],
    imports: [
        AppRoutingModule,
        BrowserModule.withServerTransition({appId: 'serverApp'}),
        HttpClientModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    providers: [
        {
            provide: APP_INITIALIZER,
            useFactory: (serviceManager: ManagerService, serviceAuth: AuthService) => () => {
                serviceManager.getFirstSettings();

                // если страницу обновили, то сразу же и проверим сессию
                if (serviceAuth.JWT) {
                    serviceAuth.check();
                }
            },
            deps: [ManagerService, AuthService],
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorInterceptor,
            multi: true
        },
        AuthGuardService,
        LocalStorageService,
        Title,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

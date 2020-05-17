import {BrowserModule} from '@angular/platform-browser';
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
import {AdComponent} from './components/ad/ad.component';
import {SafeHtmlPipe} from './pipes/safe-html.pipe';
import {BreadcrumbsComponent} from './components/breadcrumbs/breadcrumbs.component';
import {PageSearchComponent} from './components/page-search/page-search.component';
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
import {PageProfileInfoComponent} from './components/page-profile/info/info.component';
import {PageProfileSettingsComponent} from './components/page-profile/settings/settings.component';
import {PageProfileAdsComponent} from './components/page-profile/ads/ads.component';
import {AuthService} from './services/auth.service';
import {ManagerService} from './services/manager.service';
import {CatsHorizAccordionComponent} from './components/cats-horiz-accordion/cats-horiz-accordion.component';
import {PageRecoverSenderComponent} from './components/page-recover/sender/sender.component';
import {PageRecoverCheckHashComponent} from './components/page-recover/check-hash/check-hash.component';
import {PageAdmComponent} from './components/page-adm/page-adm.component';
import {DynamicPropsComponent} from './components/dynamic-props/dynamic-props.component';
import {DynamicPropComponent} from './components/dynamic-prop/dynamic-prop.component';
import {PrettyJsonPipe} from './pipes/pretty-json.pipe';
import {ToggleActiveDirective} from './directives/toggle-active.directive';
import {FormsCatsGetCatsComponent} from './components/forms-cats/forms-cats-get-cats/forms-cats-get-cats.component';
import {FormsCatsGetCatsCatidComponent} from './components/forms-cats/forms-cats-get-cats-catid/forms-cats-get-cats-catid.component';
import {FormsCatsPostCatsComponent} from './components/forms-cats/forms-cats-post-cats/forms-cats-post-cats.component';
import {FormsCatsPutCatsCatidComponent} from './components/forms-cats/forms-cats-put-cats-catid/forms-cats-put-cats-catid.component';
import {FormsCatsDeleteCatsCatidComponent} from './components/forms-cats/forms-cats-delete-cats-catid/forms-cats-delete-cats-catid.component';
import {FormsUsersGetUsersComponent} from './components/forms-users/forms-users-get-users/forms-users-get-users.component';
import {FormsUsersGetUsersUseridComponent} from './components/forms-users/forms-users-get-users-userid/forms-users-get-users-userid.component';
import {FormsUsersPostUsersComponent} from './components/forms-users/forms-users-post-users/forms-users-post-users.component';
import {FormsUsersPutUsersUseridComponent} from './components/forms-users/forms-users-put-users-userid/forms-users-put-users-userid.component';
import {FormsUsersDeleteUsersUseridComponent} from './components/forms-users/forms-users-delete-users-userid/forms-users-delete-users-userid.component';
import {FormsAdsGetAdsComponent} from './components/forms-ads/forms-ads-get-ads/forms-ads-get-ads.component';
import {FormsAdsGetAdsAdidComponent} from './components/forms-ads/forms-ads-get-ads-adid/forms-ads-get-ads-adid.component';
import {FormsAdsPostAdsComponent} from './components/forms-ads/forms-ads-post-ads/forms-ads-post-ads.component';
import {FormsAdsPutAdsAdidComponent} from './components/forms-ads/forms-ads-put-ads-adid/forms-ads-put-ads-adid.component';
import {FormsAdsDeleteAdsAdidComponent} from './components/forms-ads/forms-ads-delete-ads-adid/forms-ads-delete-ads-adid.component';
import {FormsPropsGetPropsComponent} from './components/forms-props/forms-props-get-props/forms-props-get-props.component';
import {FormsPropsGetPropsPropidComponent} from './components/forms-props/forms-props-get-props-propid/forms-props-get-props-propid.component';
import {FormsPropsPutPropsPropidComponent} from './components/forms-props/forms-props-put-props-propid/forms-props-put-props-propid.component';
import {FormsPropsDeletePropsPropidComponent} from './components/forms-props/forms-props-delete-props-propid/forms-props-delete-props-propid.component';
import {FormsPropsPostPropsComponent} from './components/forms-props/forms-props-post-props/forms-props-post-props.component';
import {DynamicValuesComponent} from './components/dynamic-values/dynamic-values.component';
import {DynamicValueComponent} from './components/dynamic-value/dynamic-value.component';

@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        PageMainComponent,
        PageCatComponent,
        PageAdComponent,
        FooterComponent,
        HeaderComponent,
        TopMenuCatsTreeComponent,
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
        PageProfileInfoComponent,
        PageProfileSettingsComponent,
        PageProfileAdsComponent,
        PageAdCreateEditComponent,
        CatsHorizAccordionComponent,
        PageRecoverSenderComponent,
        PageRecoverCheckHashComponent,
        PageAdmComponent,
        DynamicPropsComponent,
        DynamicPropComponent,
        PrettyJsonPipe,
        ToggleActiveDirective,
        FormsCatsGetCatsComponent,
        FormsCatsGetCatsCatidComponent,
        FormsCatsPostCatsComponent,
        FormsCatsPutCatsCatidComponent,
        FormsCatsDeleteCatsCatidComponent,
        FormsUsersGetUsersComponent,
        FormsUsersGetUsersUseridComponent,
        FormsUsersPostUsersComponent,
        FormsUsersPutUsersUseridComponent,
        FormsUsersDeleteUsersUseridComponent,
        FormsAdsGetAdsComponent,
        FormsAdsGetAdsAdidComponent,
        FormsAdsPostAdsComponent,
        FormsAdsPutAdsAdidComponent,
        FormsAdsDeleteAdsAdidComponent,
        FormsPropsGetPropsComponent,
        FormsPropsGetPropsPropidComponent,
        FormsPropsPutPropsPropidComponent,
        FormsPropsDeletePropsPropidComponent,
        FormsPropsPostPropsComponent,
        DynamicValuesComponent,
        DynamicValueComponent,
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
            useFactory: (serviceManager: ManagerService, auth: AuthService) => () => {
                serviceManager.getFirstSettings();

                // если страницу обновили, то сразу же и проверим сессию
                if (auth.JWT) {
                    auth.check();
                }
            },
            deps: [ManagerService, AuthService],
            multi: true
        },
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
        {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    ],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}

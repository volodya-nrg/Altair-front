import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {PageAdmComponent} from './components/page-adm/page-adm.component';
import {DynamicPropsComponent} from './components/dynamic-props/dynamic-props.component';
import {DynamicPropComponent} from './components/dynamic-prop/dynamic-prop.component';
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
import {FormsKindPropsGetAllComponent} from './components/forms-kind-props/forms-kind-props-get-all/forms-kind-props-get-all.component';
import {FormsKindPropsGetOneComponent} from './components/forms-kind-props/forms-kind-props-get-one/forms-kind-props-get-one.component';
import {FormsKindPropsPostComponent} from './components/forms-kind-props/forms-kind-props-post/forms-kind-props-post.component';
import {FormsKindPropsPutComponent} from './components/forms-kind-props/forms-kind-props-put/forms-kind-props-put.component';
import {FormsKindPropsDeleteComponent} from './components/forms-kind-props/forms-kind-props-delete/forms-kind-props-delete.component';
import {FormsPagesAdAdidComponent} from './components/forms-pages/forms-pages-ad-adid/forms-pages-ad-adid.component';
import {FormsPagesMainComponent} from './components/forms-pages/forms-pages-main/forms-pages-main.component';
import {FormsSearchAdsComponent} from './components/forms-search/forms-search-ads/forms-search-ads.component';
import {FormsTestComponent} from './components/forms-test/forms-test.component';
import {PrettyJsonPipe} from './pipes/pretty-json.pipe';
import {AdmRoutingModule} from './adm-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    declarations: [
        PageAdmComponent,
        DynamicPropsComponent,
        DynamicPropComponent,
        DynamicValuesComponent,
        DynamicValueComponent,
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
        FormsKindPropsGetAllComponent,
        FormsKindPropsGetOneComponent,
        FormsKindPropsPostComponent,
        FormsKindPropsPutComponent,
        FormsKindPropsDeleteComponent,
        FormsPagesAdAdidComponent,
        FormsPagesMainComponent,
        FormsSearchAdsComponent,
        FormsTestComponent,
        PrettyJsonPipe,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdmRoutingModule,
        SharedModule,
    ],
    exports: [],
})
export class AdmModule {
}

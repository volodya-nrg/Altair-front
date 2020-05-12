import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AdmRoutingModule} from './adm-routing.module';
import {MainComponent} from './components/main/main.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CatsComponent} from './components/cats/cats.component';
import {UsersComponent} from './components/users/users.component';
import {AdsComponent} from './components/ads/ads.component';
import {PropsComponent} from './components/props/props.component';
import {KindPropsComponent} from './components/kind-props/kind-props.component';
import {PagesComponent} from './components/pages/pages.component';
import {AuthComponent} from './components/auth/auth.component';
import {SearchComponent} from './components/search/search.component';
import {ProfileComponent} from './components/profile/profile.component';
import {PrettyJsonPipe} from './pipes/pretty-json.pipe';
import { BlockPropsComponent } from './components/block-props/block-props.component';

@NgModule({
    declarations: [
        MainComponent,
        CatsComponent,
        UsersComponent,
        AdsComponent,
        PropsComponent,
        KindPropsComponent,
        PagesComponent,
        AuthComponent,
        SearchComponent,
        ProfileComponent,
        PrettyJsonPipe,
        BlockPropsComponent,
    ],
    imports: [
        CommonModule,
        AdmRoutingModule,
        ReactiveFormsModule,
    ]
})
export class AdmModule {
}

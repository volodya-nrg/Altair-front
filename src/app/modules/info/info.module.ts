import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InfoRoutingModule} from './info-routing.module';
import {PageAgreementComponent} from './components/page-agreement/page-agreement.component';
import {PageAboutComponent} from './components/page-about/page-about.component';

@NgModule({
    imports: [
        CommonModule,
        InfoRoutingModule
    ],
    declarations: [PageAgreementComponent, PageAboutComponent]
})
export class InfoModule {
}

import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageAgreementComponent} from './components/page-agreement/page-agreement.component';
import {PageAboutComponent} from './components/page-about/page-about.component';
import {PageNotFoundComponent} from '../../components/page-not-found/page-not-found.component';
import {PagePrivacyPolicyComponent} from './components/page-privacy-policy/page-privacy-policy.component';

const routes: Routes = [
    {path: 'agreement', component: PageAgreementComponent},
    {path: 'privacy-policy', component: PagePrivacyPolicyComponent},
    {path: 'about', component: PageAboutComponent},
    {path: '**', component: PageNotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class InfoRoutingModule {
}

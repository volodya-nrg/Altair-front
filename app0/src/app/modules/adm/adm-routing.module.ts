import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PageAdmComponent} from './components/page-adm/page-adm.component';

const routes: Routes = [
    {path: '', component: PageAdmComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdmRoutingModule {
}

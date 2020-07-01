import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {AdComponent} from '../../components/ad/ad.component';
import {AdFormComponent} from '../../components/ad-form/ad-form.component';
import {MyCurrencyPipe} from '../../pipes/my-currency.pipe';
import {PreloaderComponent} from '../../components/preloader/preloader.component';
import {ToggleActiveDirective} from '../../directives/toggle-active.directive';

@NgModule({
    declarations: [
        AdComponent,
        AdFormComponent,
        MyCurrencyPipe,
        PreloaderComponent,
        ToggleActiveDirective,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
    ],
    exports: [
        AdComponent,
        AdFormComponent,
        MyCurrencyPipe,
        PreloaderComponent,
        ToggleActiveDirective,
    ],
})
export class SharedModule {
}

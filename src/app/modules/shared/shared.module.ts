import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {PreloaderComponent} from '../../components/preloader/preloader.component';
import {AdComponent} from '../../components/ad/ad.component';
import {MyCurrencyPipe} from '../../pipes/my-currency.pipe';
import {ToggleActiveDirective} from '../../directives/toggle-active.directive';

@NgModule({
    declarations: [
        PreloaderComponent,
        AdComponent,
        MyCurrencyPipe,
        ToggleActiveDirective,
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        PreloaderComponent,
        AdComponent,
        MyCurrencyPipe,
        ToggleActiveDirective,
    ],
})
export class SharedModule {
}

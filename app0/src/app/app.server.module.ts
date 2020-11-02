import {NgModule} from '@angular/core';
import {ServerModule} from '@angular/platform-server';
import {AppModule} from './app.module';
import {AppComponent} from './app.component';
import {LocalStorageService} from './services/local-storage.service';
import {ServerLocalStorageService} from './services/server-local-storage.service';

@NgModule({
    imports: [
        AppModule,
        ServerModule,
    ],
    bootstrap: [AppComponent],
    providers: [
        {provide: LocalStorageService, useClass: ServerLocalStorageService}
    ],
})
export class AppServerModule {
}

import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {SettingsService} from '../services/settings.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private serviceSettings: SettingsService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(err => {
                console.log('ErrorInterceptor');

                if (err.status === 401) {
                    // редирект на страницу авторизации с гет-параметром редиректа назад
                }

                console.log(err);

                //const error = err.error.message || err.statusText;
                return throwError(err);
            })
        );
    }
}

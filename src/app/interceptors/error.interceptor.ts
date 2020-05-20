import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MyErrorService} from '../services/my-error.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private serviceMyError: MyErrorService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(err => {
                console.log('ErrorInterceptor', err);

                if (err.status === 401) {
                    console.log('Редирект на стр. авторизации');
                    // редирект на страницу авторизации с гет-параметром редиректа назад
                } else {
                    let msg = typeof err.error === 'string' ? err.error : err.message;

                    this.serviceMyError.errors$.next({
                        title: `${err.statusText} (${err.status})`,
                        msg: msg,
                    });
                }

                return throwError(err);
            })
        );
    }
}

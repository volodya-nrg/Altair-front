import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {MyErrorService} from '../services/my-error.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private serviceMyError: MyErrorService,
        private serviceAuth: AuthService,
        private router: Router,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError(err => {
                if (err.status === 401) {
                    this.serviceAuth.JWT = '';

                    if (this.router.url === '/login') {
                        this.handleError(err);
                    } else {
                        this.serviceAuth.toggleModalAuth$.next(true);
                    }

                } else if (err.status === 428) { // отсутствует (обычно куки) предсустановленные данные
                    // eсли нет куки, то и JWT затираем.
                    this.serviceAuth.JWT = '';

                } else {
                    this.handleError(err);
                }

                return throwError(err);
            })
        );
    }
    handleError(err: any) {
        let msg = typeof err.error === 'string' ? err.error : err.message;

        console.error(err);
        this.serviceMyError.errors$.next({
            title: `${err.statusText} (${err.status})`,
            msg: msg,
        });
    }
}

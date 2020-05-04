import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingsService} from '../services/settings.service';
import {environment} from '../../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private serviceSettings: SettingsService
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let req = request.clone();

        // подставляем токен в определенных случаях.
        if (req.method.toUpperCase() != 'GET' ||
            req.url == environment.apiUrl + '/api/v1/props' ||
            req.url == environment.apiUrl + '/api/v1/users') {

            if (!req.headers.has('Authorization')) {
                console.log('вставлен заголовок');
                req = req.clone({
                    //withCredentials: true,
                    //headers: req.headers.set('Authorization', 'Bearer ' + this.serviceSettings.JWT)
                    setHeaders: {Authorization: 'Bearer ' + this.serviceSettings.JWT}
                });
            }
        }

        return next.handle(req);
    }
}

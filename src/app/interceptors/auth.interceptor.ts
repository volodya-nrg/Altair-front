import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SettingsService} from '../services/settings.service';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private serviceSettings: SettingsService,
        private serviceAuth: AuthService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const url = environment.apiUrl;
        const api = url + '/api/v1';
        const allowUrlsForCookie = [api + '/auth/login', api + '/auth/logout', api + '/auth/refresh-tokens'];
        let req = request.clone();

        // разрешаем принятие кук на определенные страницы
        if (allowUrlsForCookie.indexOf(req.url) != -1) {
            req = req.clone({
                withCredentials: true
            });
        }
        // если это комманда на изменение или спец. страницы, то подставляем авторизацию
        if (req.method.toUpperCase() != 'GET' || req.url === api + '/auth/refresh-tokens' || req.url === api + '/auth/logout') {
            req = req.clone({
                setHeaders: {Authorization: 'Bearer ' + this.serviceSettings.JWT}
            });
            this.serviceSettings.JWT = '';
        }

        if (this.serviceSettings.JWT) {
            const jwt = this.serviceSettings.parseJWT(this.serviceSettings.JWT);
            if (jwt && jwt.Exp) {
                const currentTime = new Date();
                const expIn = new Date(jwt.Exp * 1000);
                const timeDiff = expIn.getTime() - currentTime.getTime();
                const diffSec = Math.ceil(timeDiff / 1000);

                // если осталось 10 секунд до окончания access-token-а
                if (diffSec < 10) {
                    this.serviceAuth.refreshTokenSubject.next(this.serviceSettings.JWT);
                }
            }
        }

        return next.handle(req);
    }
}

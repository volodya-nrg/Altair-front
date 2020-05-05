import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private minOffsetTimeLifeAccessToken: number = 10;

    constructor(
        private serviceAuth: AuthService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        const url = environment.apiUrl;
        const api = url + '/api/v1';
        const allowUrlsForCookie = [api + '/auth/login', api + '/auth/logout', api + '/auth/refresh-tokens'];
        const urlsForAuth = [api + '/auth/logout', api + '/auth/refresh-tokens']; // api + '/users/7/ads',
        let req = request.clone();

        // разрешаем принятие кук на определенные страницы
        if (allowUrlsForCookie.indexOf(req.url) != -1) {
            req = req.clone({
                withCredentials: true
            });
        }
        // если это комманда на изменение или спец. страницы, то подставляем авторизацию
        if (this.serviceAuth.JWT && (req.method.toUpperCase() != 'GET' || urlsForAuth.indexOf(req.url) != -1)) {
            req = req.clone({
                setHeaders: {Authorization: 'Bearer ' + this.serviceAuth.JWT}
            });
            this.serviceAuth.JWT = '';
        }

        if (this.serviceAuth.JWT) {
            const jwt = this.serviceAuth.parseJWT(this.serviceAuth.JWT);

            if (jwt && jwt.Exp) {
                const timeDiff = new Date(jwt.Exp * 1000).getTime() - new Date().getTime();
                const diffSec = Math.ceil(timeDiff / 1000);

                // если осталось 10 секунд до окончания access-token-а
                if (diffSec < this.minOffsetTimeLifeAccessToken) {
                    this.serviceAuth.refreshTokens().subscribe(x => {
                        this.serviceAuth.JWT = x.JWT;
                        this.serviceAuth.profileBhSubject.next(x.user);
                    });
                }
            }
        }

        return next.handle(req);
    }
}

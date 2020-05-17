import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private minOffsetTimeLifeAccessToken: number = 10;

    constructor(
        private serviceAuth: AuthService,
    ) {
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        let req = request.clone({
            withCredentials: true
        });

        // если это комманда на изменение или спец. страницы, то подставляем авторизацию
        if (this.serviceAuth.JWT) {
            req = req.clone({
                setHeaders: {Authorization: 'Bearer ' + this.serviceAuth.JWT}
            });

            const jwt = this.serviceAuth.parseJWT(this.serviceAuth.JWT);
            const timeDiff = new Date(jwt.Exp * 1000).getTime() - new Date().getTime();
            const diffSec = Math.ceil(timeDiff / 1000);

            // если осталось 10 секунд до окончания access-token-а
            if (diffSec < this.minOffsetTimeLifeAccessToken) {
                this.serviceAuth.JWT = ''; // т.к. заголовок выставлен, то можно удалить, чтоб не было повторных вызовов
                this.serviceAuth.refreshTokens().subscribe(x => {
                    this.serviceAuth.JWT = x.JWT;
                    this.serviceAuth.profileBhSubject.next(x.user);
                });
            }
        }

        return next.handle(req);
    }
}

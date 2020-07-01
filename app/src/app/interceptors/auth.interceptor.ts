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
            withCredentials: true, // нужно для сохранения кук и др.
        });

        // Если есть JWT и запрос идет не на "refresh-tokens", то подставим доп. данные.
        // Проверка нужна, чтоб не было зацикливания.
        if (this.serviceAuth.JWT) {
            req = req.clone({
                setHeaders: {Authorization: 'Bearer ' + this.serviceAuth.JWT}
            });

            if (!request.url.endsWith('/auth/refresh-tokens')) {
                const jwt = this.serviceAuth.parseJWT(this.serviceAuth.JWT);
                const timeDiff = new Date(jwt.Exp * 1000).getTime() - new Date().getTime();
                const diffSec = Math.ceil(timeDiff / 1000);

                // если осталось 10 секунд до окончания access-token-а
                if (diffSec < this.minOffsetTimeLifeAccessToken) {
                    this.serviceAuth.refreshTokens().subscribe(x => {
                        this.serviceAuth.JWT = x.JWT;
                        this.serviceAuth.profile$.next(x.userExt);
                    });
                }
            }
        }

        return next.handle(req);
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {JwtInterface} from '../interfaces/response/jwt';
import {SettingsService} from './settings.service';
import {Helpers} from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = environment.apiUrl;
    redirectUrl: string;
    refreshTokenSubject: Subject<string> = new Subject<string>();
    refreshToken$: Observable<string>;

    constructor(
        private http: HttpClient,
        private serviceSettings: SettingsService,
    ) {
        this.refreshTokenSubject = new Subject<string>();
        this.refreshToken$ = this.refreshTokenSubject.asObservable();
        this.refreshToken$.subscribe(x => {
            console.log('====>', x);
            const s = this.refreshTokens().subscribe(y => {
                    console.log('UPDATE JWT');
                    this.serviceSettings.JWT = y.JWT;
                },
                err => {
                    Helpers.handleErr(err);
                },
                () => {
                }
            );
        });
    }

    login(data: any): Observable<JwtInterface> {
        return this.http.post<JwtInterface>(`${this.url}/api/v1/auth/login`, data);
    }

    logout(): Observable<void> {
        return this.http.get<void>(`${this.url}/api/v1/auth/logout`);
    }

    refreshTokens(): Observable<JwtInterface> {
        return this.http.post<JwtInterface>(`${this.url}/api/v1/auth/refresh-tokens`, null);
    }
}

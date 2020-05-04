import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {JwtInterface} from '../interfaces/response/jwt';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = environment.apiUrl;
    redirectUrl: string;

    constructor(
        private http: HttpClient
    ) {
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

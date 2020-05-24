import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {JwtInterface} from '../interfaces/response/jwt';
import {UserInterface} from '../interfaces/response/user';
import {JwtPayloadInterface} from '../interfaces/jwt-payload';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private url: string = environment.apiUrl;
    profile$: BehaviorSubject<UserInterface> = new BehaviorSubject<UserInterface>(null);
    toggleModalAuth$: Subject<boolean> = new Subject<boolean>();

    set JWT(data: string) {
        if (data === '') {
            localStorage.removeItem('JWT');
            return;
        }

        localStorage.setItem('JWT', data);
    }

    get JWT(): string {
        return localStorage.getItem('JWT');
    }

    constructor(
        private http: HttpClient,
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

    parseJWT(str: string): JwtPayloadInterface {
        const part: string = str.substring(0, str.indexOf('.'));
        return JSON.parse(atob(part));
    }

    check(): void {
        const s = this.refreshTokens().subscribe(
            x => {
                this.JWT = x.JWT;
                this.profile$.next(x.user);
            },
            err => s.unsubscribe(),
            () => s.unsubscribe()
        );
    }

    isAdmin(): boolean {
        let result: boolean = false;

        if (!this.JWT) {
            return result;
        }

        const jwt = this.parseJWT(this.JWT);
        result = jwt.UserRole === 'admin';

        return result;
    }
}

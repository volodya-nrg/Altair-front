import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {JwtInterface} from '../interfaces/response/jwt';
import {UserExtInterface} from '../interfaces/response/user';
import {JwtPayloadInterface} from '../interfaces/jwt-payload';
import {LocalStorageService} from './local-storage.service';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    profile$: BehaviorSubject<UserExtInterface> = new BehaviorSubject<UserExtInterface>(null);
    toggleModalAuth$: Subject<boolean> = new Subject<boolean>();

    constructor(
        private http: HttpClient,
        private localStorage: LocalStorageService,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    }

    set JWT(data: string) {
        if (data === '') {
            this.localStorage.removeItem('JWT');
            return;
        }

        this.localStorage.setItem('JWT', data);
    }

    get JWT(): string {
        return this.localStorage.getItem('JWT');
    }

    login(data: any): Observable<JwtInterface> {
        return this.http.post<JwtInterface>(`/api/v1/auth/login`, data);
    }

    logout(): Observable<void> {
        return this.http.get<void>(`/api/v1/auth/logout`);
    }

    refreshTokens(): Observable<JwtInterface> {
        return this.http.post<JwtInterface>(`/api/v1/auth/refresh-tokens`, null);
    }

    parseJWT(str: string): JwtPayloadInterface {
        const part: string = str.substring(0, str.indexOf('.'));
        return JSON.parse(atob(part));
    }

    check(): void {
        if (isPlatformBrowser(this.platformId)) {
            const s = this.refreshTokens().subscribe(
                x => {
                    this.JWT = x.JWT;
                    this.profile$.next(x.userExt);
                },
                err => s.unsubscribe(),
                () => s.unsubscribe()
            );
        }
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

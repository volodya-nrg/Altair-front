import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserExtInterface, UserInterface} from '../interfaces/response/user';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    constructor(
        private http: HttpClient
    ) {
    }

    getInfo(): Observable<UserExtInterface> {
        return this.http.get<UserExtInterface>(`/api/v1/profile/info`);
    }

    getSettings(): Observable<string> {
        return this.http.get<string>(`/api/v1/profile/settings`);
    }

    create(data: any): Observable<UserInterface> {
        return this.http.post<UserInterface>(`/api/v1/profile`, data);
    }

    update(data: any): Observable<UserExtInterface> {
        return this.http.put<UserExtInterface>(`/api/v1/profile`, data);
    }

    delete(): Observable<void> {
        return this.http.delete<void>(`/api/v1/profile`);
    }

    getAds(limit: number, offset: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/profile/ads`, {
            params: {
                limit: limit.toString(),
                offset: offset.toString(),
            }
        });
    }

    getAd(adID: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`/api/v1/profile/ads/${adID}`);
    }

    checkEmailThroughHash(hash: string): Observable<void> {
        return this.http.get<void>(`/api/v1/profile/check-email-through/${hash}`);
    }
}

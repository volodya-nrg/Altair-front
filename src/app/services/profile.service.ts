import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces/response/user';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getInfo(): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.url}/api/v1/profile/info`);
    }

    getSettings(): Observable<string> {
        return this.http.get<string>(`${this.url}/api/v1/profile/settings`);
    }

    create(data: any): Observable<UserInterface> {
        return this.http.post<UserInterface>(`${this.url}/api/v1/profile`, data);
    }

    update(data: any): Observable<UserInterface> {
        return this.http.put<UserInterface>(`${this.url}/api/v1/profile`, data);
    }

    delete(): Observable<void> {
        return this.http.delete<void>(`${this.url}/api/v1/profile`);
    }

    getAds(limit: number, offset: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/profile/ads`, {
            params: {
                limit: limit.toString(),
                offset: offset.toString(),
            }
        });
    }

    getAd(adId: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`${this.url}/api/v1/profile/ads/${adId}`);
    }
}

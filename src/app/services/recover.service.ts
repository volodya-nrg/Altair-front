import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecoverService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    sendHash(data: any): Observable<void> {
        return this.http.post<void>(`${this.url}/api/v1/recover/send-hash`, data);
    }

    changePassword(data: any): Observable<void> {
        return this.http.post<void>(`${this.url}/api/v1/recover/change-pass`, data);
    }
}

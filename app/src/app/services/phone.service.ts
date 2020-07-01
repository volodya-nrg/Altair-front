import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PhoneInterface} from '../interfaces/response/phone';
import {UserExtInterface} from '../interfaces/response/user';

@Injectable({
    providedIn: 'root'
})
export class PhoneService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getById(phoneId: number): Observable<PhoneInterface> {
        return this.http.get<PhoneInterface>(`/api/v1/phones/${phoneId}`);
    }

    create(form: any): Observable<PhoneInterface> {
        return this.http.post<PhoneInterface>(`/api/v1/profile/phone`, form);
    }

    check(number: string, code: string): Observable<UserExtInterface> {
        return this.http.put<UserExtInterface>(`/api/v1/profile/phone/${number}/${code}`, null);
    }

    delete(number: string): Observable<void> {
        return this.http.delete<void>(`/api/v1/profile/phone/${number}`);
    }
}

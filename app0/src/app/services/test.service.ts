import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    constructor(
        private http: HttpClient
    ) {
    }

    request(): Observable<any> {
        return this.http.get<any>(`/api/v1/test`);
    }
}

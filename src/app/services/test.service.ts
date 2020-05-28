import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class TestService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    request(): Observable<any> {
        return this.http.get<any>(`${this.url}/test`);
    }
}

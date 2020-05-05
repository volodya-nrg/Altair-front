import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces/response/user';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(`${this.url}/api/v1/users`);
    }

    getUser(userId: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.url}/api/v1/users/` + userId);
    }

    getUserAds(userId: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/users/` + userId + '/ads');
    }

    create(data: any): Observable<UserInterface> {
        return this.http.post<UserInterface>(`${this.url}/api/v1/users`, data);
    }

    update(userId: number, data: any): Observable<UserInterface> {
        return this.http.put<UserInterface>(`${this.url}/api/v1/users/` + userId, data);
    }
}

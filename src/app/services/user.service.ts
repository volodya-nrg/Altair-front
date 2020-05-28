import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces/response/user';

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
        return this.http.get<UserInterface[]>(`${this.url}/users`);
    }

    getUser(userId: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(`${this.url}/users/${userId}`);
    }

    create(data: any): Observable<UserInterface> {
        return this.http.post<UserInterface>(`${this.url}/users`, data);
    }

    update(userId: number, data: any): Observable<UserInterface> {
        return this.http.put<UserInterface>(`${this.url}/users/${userId}`, data);
    }

    delete(userId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/users/${userId}`);
    }
}

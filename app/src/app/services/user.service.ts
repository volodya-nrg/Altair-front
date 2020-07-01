import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserInterface} from '../interfaces/response/user';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(
        private http: HttpClient
    ) {
    }

    getUsers(): Observable<UserInterface[]> {
        return this.http.get<UserInterface[]>(`/api/v1/users`);
    }

    getUser(userId: number): Observable<UserInterface> {
        return this.http.get<UserInterface>(`/api/v1/users/${userId}`);
    }

    create(data: any): Observable<UserInterface> {
        return this.http.post<UserInterface>(`/api/v1/users`, data);
    }

    update(userId: number, data: any): Observable<UserInterface> {
        return this.http.put<UserInterface>(`/api/v1/users/${userId}`, data);
    }

    delete(userId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/users/${userId}`);
    }
}

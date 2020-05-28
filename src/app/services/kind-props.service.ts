import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KindPropInterface} from '../interfaces/response/kind-prop';

@Injectable({
    providedIn: 'root'
})
export class KindPropsService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    getAll(): Observable<KindPropInterface[]> {
        return this.http.get<KindPropInterface[]>(`${this.url}/kind_props`);
    }

    getOne(elId: number): Observable<KindPropInterface> {
        return this.http.get<KindPropInterface>(`${this.url}/kind_props/${elId}`);
    }

    create(data: any): Observable<KindPropInterface> {
        return this.http.post<KindPropInterface>(`${this.url}/kind_props`, data);
    }

    update(elId: number, data: any): Observable<KindPropInterface> {
        return this.http.put<KindPropInterface>(`${this.url}/kind_props/${elId}`, data);
    }

    delete(elId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/kind_props/${elId}`);
    }
}

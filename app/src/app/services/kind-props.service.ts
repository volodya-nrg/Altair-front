import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {KindPropInterface} from '../interfaces/response/kind-prop';

@Injectable({
    providedIn: 'root'
})
export class KindPropsService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getAll(): Observable<KindPropInterface[]> {
        return this.http.get<KindPropInterface[]>(`/api/v1/kind_props`);
    }

    getOne(elId: number): Observable<KindPropInterface> {
        return this.http.get<KindPropInterface>(`/api/v1/kind_props/${elId}`);
    }

    create(data: any): Observable<KindPropInterface> {
        return this.http.post<KindPropInterface>(`/api/v1/kind_props`, data);
    }

    update(elId: number, data: any): Observable<KindPropInterface> {
        return this.http.put<KindPropInterface>(`/api/v1/kind_props/${elId}`, data);
    }

    delete(elId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/kind_props/${elId}`);
    }
}

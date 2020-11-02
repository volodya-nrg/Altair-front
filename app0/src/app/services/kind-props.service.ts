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

    getOne(elID: number): Observable<KindPropInterface> {
        return this.http.get<KindPropInterface>(`/api/v1/kind_props/${elID}`);
    }

    create(data: any): Observable<KindPropInterface> {
        return this.http.post<KindPropInterface>(`/api/v1/kind_props`, data);
    }

    update(elID: number, data: any): Observable<KindPropInterface> {
        return this.http.put<KindPropInterface>(`/api/v1/kind_props/${elID}`, data);
    }

    delete(elID: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/kind_props/${elID}`);
    }
}

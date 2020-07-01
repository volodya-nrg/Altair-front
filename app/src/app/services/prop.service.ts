import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropFullInterface} from '../interfaces/response/prop';

@Injectable({
    providedIn: 'root'
})
export class PropService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getPropsFullForCat(catId: number): Observable<PropFullInterface[]> {
        return this.http.get<PropFullInterface[]>(`/api/v1/props`, {
            params: {
                catId: catId.toString(),
            }
        });
    }

    getOne(propId: number): Observable<PropFullInterface> {
        return this.http.get<PropFullInterface>(`/api/v1/props/${propId}`);
    }

    create(data: any): Observable<PropFullInterface> {
        return this.http.post<PropFullInterface>(`/api/v1/props`, data);
    }

    update(propId: number, data: any): Observable<PropFullInterface> {
        return this.http.put<PropFullInterface>(`/api/v1/props/${propId}`, data);
    }

    delete(propId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/props/${propId}`);
    }
}

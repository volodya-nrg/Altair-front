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

    getPropsFullForCat(catID: number): Observable<PropFullInterface[]> {
        return this.http.get<PropFullInterface[]>(`/api/v1/props`, {
            params: {
                catID: catID.toString(),
            }
        });
    }

    getOne(propID: number): Observable<PropFullInterface> {
        return this.http.get<PropFullInterface>(`/api/v1/props/${propID}`);
    }

    create(data: any): Observable<PropFullInterface> {
        return this.http.post<PropFullInterface>(`/api/v1/props`, data);
    }

    update(propID: number, data: any): Observable<PropFullInterface> {
        return this.http.put<PropFullInterface>(`/api/v1/props/${propID}`, data);
    }

    delete(propID: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/props/${propID}`);
    }
}

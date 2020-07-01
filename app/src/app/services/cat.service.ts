import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CatFullInterface, CatInterface, CatTreeInterface} from '../interfaces/response/cat';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    constructor(
        private http: HttpClient
    ) {
    }

    getList(): Observable<CatInterface> {
        return this.http.get<CatInterface>(`/api/v1/cats`, {
            params: {
                asTree: 'false',
            }
        });
    }

    getTree(): Observable<CatTreeInterface> {
        return this.http.get<CatTreeInterface>(`/api/v1/cats`, {
            params: {
                asTree: 'true'
            }
        });
    }

    getCatId(catId: number, isWithPropsOnlyFiltered: boolean): Observable<CatFullInterface> {
        return this.http.get<CatFullInterface>(`/api/v1/cats/${catId}`, {
            params: {
                withPropsOnlyFiltered: isWithPropsOnlyFiltered ? 'true' : 'false',
            }
        });
    }

    post(data: any): Observable<CatFullInterface> {
        return this.http.post<CatFullInterface>(`/api/v1/cats`, data);
    }

    put(catId: number, data: any): Observable<CatFullInterface> {
        return this.http.put<CatFullInterface>(`/api/v1/cats/${catId}`, data);
    }

    delete(catId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/cats/${catId}`);
    }
}

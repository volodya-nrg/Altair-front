import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CatFullInterface, CatInterface, CatTreeInterface} from '../interfaces/response/cat';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    getList(): Observable<CatInterface> {
        return this.http.get<CatInterface>(`${this.url}/cats`, {
            params: {
                asTree: 'false',
            }
        });
    }

    getTree(): Observable<CatTreeInterface> {
        return this.http.get<CatTreeInterface>(`${this.url}/cats`, {
            params: {
                asTree: 'true'
            }
        });
    }

    getCatId(catId: number, isWithPropsOnlyFiltered: boolean): Observable<CatFullInterface> {
        return this.http.get<CatFullInterface>(`${this.url}/cats/${catId}`, {
            params: {
                withPropsOnlyFiltered: isWithPropsOnlyFiltered ? 'true' : 'false',
            }
        });
    }

    post(data: any): Observable<CatFullInterface> {
        return this.http.post<CatFullInterface>(`${this.url}/cats`, data);
    }

    put(catId: number, data: any): Observable<CatFullInterface> {
        return this.http.put<CatFullInterface>(`${this.url}/cats/${catId}`, data);
    }

    delete(catId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/cats/${catId}`);
    }
}

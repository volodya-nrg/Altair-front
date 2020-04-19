import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CatInterface, CatTreeInterface} from '../interfaces/response/cat';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class CatService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    getList(): Observable<CatInterface> {
        return this.http.get<CatInterface>(`${this.url}/api/v1/cats`, {
            params: {
                asTree: 'false',
            }
        });
    }

    getTree(): Observable<CatTreeInterface> {
        return this.http.get<CatTreeInterface>(`${this.url}/api/v1/cats`, {
            params: {
                asTree: 'true'
            }
        });
    }
}

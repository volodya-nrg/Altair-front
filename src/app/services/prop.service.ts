import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropFullInterface} from '../interfaces/response/prop';

@Injectable({
    providedIn: 'root'
})
export class PropService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    getPropsFullForCat(catId: number): Observable<PropFullInterface[]> {
        return this.http.get<PropFullInterface[]>(`${this.url}/api/v1/props`, {
            params: {
                catId: catId.toString(),
            }
        });
    }
}
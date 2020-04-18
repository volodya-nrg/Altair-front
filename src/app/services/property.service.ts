import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PropertyFullInterface} from '../interfaces/response/property';

@Injectable({
    providedIn: 'root'
})
export class PropertyService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    getPropertiesFullForCat(catId: number): Observable<PropertyFullInterface[]> {
        return this.http.get<PropertyFullInterface[]>(`${this.url}/api/v1/properties`, {
            params: {
                catId: catId.toString(),
            }
        });
    }
}

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class AdService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient,
    ) {
    }

    create(data: any): Observable<AdFullInterface> {
        return this.http.post<AdFullInterface>(`${this.url}/api/v1/ads`, data);
    }

    getFromCat(catId: number): Observable<AdFullInterface[]> {
        let options = {};

        if (catId) {
            options = {
                params: {
                    catId: catId,
                }
            };
        }

        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/ads`, options);
    }

    getOne(adId: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`${this.url}/api/v1/ads/${adId}`);
    }
}

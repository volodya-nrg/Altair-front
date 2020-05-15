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

    getOne(adId: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`${this.url}/api/v1/ads/${adId}`);
    }

    create(data: any): Observable<AdFullInterface> {
        return this.http.post<AdFullInterface>(`${this.url}/api/v1/ads`, data);
    }

    update(adId: number, data: any): Observable<AdFullInterface> {
        return this.http.put<AdFullInterface>(`${this.url}/api/v1/ads/${adId}`, data);
    }

    delete(adId: number): Observable<void> {
        return this.http.delete<void>(`${this.url}/api/v1/ads/${adId}`);
    }

    getFromCat(catId: number, limit: number, offset: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/ads`, {
            params: {
                catId: catId.toString(),
                limit: limit.toString(),
                offset: offset.toString(),
            }
        });
    }

    getByQuery(query: string, catId: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/search/ads`, {
            params: {
                q: query,
                catId: catId.toString(),
            }
        });
    }
}

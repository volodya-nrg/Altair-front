import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class AdService {
    constructor(
        private http: HttpClient,
    ) {
    }

    getOne(adId: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`/api/v1/ads/${adId}`);
    }

    create(data: any): Observable<AdFullInterface> {
        return this.http.post<AdFullInterface>(`/api/v1/ads`, data);
    }

    update(adId: number, data: any): Observable<AdFullInterface> {
        return this.http.put<AdFullInterface>(`/api/v1/ads/${adId}`, data);
    }

    delete(adId: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/ads/${adId}`);
    }

    getFromCat(data: Object): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/ads`, {
            params: {
                catId: data['catId'].toString(),
                limit: data['limit'].toString(),
                offset: data['offset'].toString(),
            }
        });
    }

    getByQuery(query: string, catId: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/search/ads`, {
            params: {
                q: query,
                catId: catId.toString(),
            }
        });
    }
}

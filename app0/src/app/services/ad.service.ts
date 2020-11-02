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

    getOne(adID: number): Observable<AdFullInterface> {
        return this.http.get<AdFullInterface>(`/api/v1/ads/${adID}`);
    }

    create(data: any): Observable<AdFullInterface> {
        return this.http.post<AdFullInterface>(`/api/v1/ads`, data);
    }

    update(adID: number, data: any): Observable<AdFullInterface> {
        return this.http.put<AdFullInterface>(`/api/v1/ads/${adID}`, data);
    }

    delete(adID: number): Observable<void> {
        return this.http.delete<void>(`/api/v1/ads/${adID}`);
    }

    getFromCat(catID: string, limit: string, offset: string): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/ads`, {
            params: {
                catID,
                limit,
                offset,
            }
        });
    }

    getByQuery(query: string, catID: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/search/ads`, {
            params: {
                q: query,
                catID: catID.toString(),
            }
        });
    }
}

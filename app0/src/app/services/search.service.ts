import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    watchForReset: Subject<boolean>;

    constructor(
        private http: HttpClient
    ) {
        this.watchForReset = new Subject();
    }

    ads(query: string, catID: string, limit: number, offset: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`/api/v1/search/ads`, {
            params: {
                q: query,
                catID, // т.к. значение находится в select-е, поэтому тип String
                limit: limit.toString(),
                offset: offset.toString(),
            },
        });
    }
}

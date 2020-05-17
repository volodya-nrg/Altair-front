import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AdFullInterface} from '../interfaces/response/ad';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    private url: string = environment.apiUrl;
    watchForReset: Subject<boolean>;

    constructor(
        private http: HttpClient
    ) {
        this.watchForReset = new Subject();
    }

    ads(query: string, catId: string, limit: number, offset: number): Observable<AdFullInterface[]> {
        return this.http.get<AdFullInterface[]>(`${this.url}/api/v1/search/ads`, {
            params: {
                q: query,
                catId: catId,
                limit: limit.toString(),
                offset: offset.toString(),
            },
        });
    }
}

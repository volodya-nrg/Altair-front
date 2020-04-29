import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagesAdInterface, PagesMainInterface} from '../interfaces/response/pages';

@Injectable({
    providedIn: 'root'
})
export class PagesService {
    private url: string = environment.apiUrl;

    constructor(
        private http: HttpClient
    ) {
    }

    pageAd(adId: number): Observable<PagesAdInterface> {
        return this.http.get<PagesAdInterface>(`${this.url}/api/v1/pages/ad/` + adId);
    }

    pageMain(limit: number): Observable<PagesMainInterface> {
        return this.http.get<PagesMainInterface>(`${this.url}/api/v1/pages/main`, {
            params: {
                limit: limit.toString(),
            }
        });
    }
}

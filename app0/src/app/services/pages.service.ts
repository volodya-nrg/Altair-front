import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PagesAdInterface, PagesMainInterface} from '../interfaces/response/pages';

@Injectable({
    providedIn: 'root'
})
export class PagesService {
    constructor(
        private http: HttpClient
    ) {
    }

    pageAd(adID: number): Observable<PagesAdInterface> {
        return this.http.get<PagesAdInterface>(`/api/v1/pages/ad/${adID}`);
    }

    pageMain(limit: number): Observable<PagesMainInterface> {
        return this.http.get<PagesMainInterface>(`/api/v1/pages/main`, {
            params: {
                limit: limit.toString(),
            }
        });
    }
}

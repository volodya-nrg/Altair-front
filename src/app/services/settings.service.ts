import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from 'rxjs';
import {SettingsInterface} from '../interfaces/response/settings';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CatTreeInterface} from '../interfaces/response/cat';
import {PropertyInterface} from '../interfaces/response/property';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private url = environment.apiUrl;
    private conf: SettingsInterface;
    settings: AsyncSubject<SettingsInterface>;
    settings$: Observable<SettingsInterface>;

    constructor(
        private http: HttpClient,
    ) {
        this.settings = new AsyncSubject;
        this.settings$ = this.settings.asObservable();
    }

    get catsTree(): CatTreeInterface {
        return this.conf.catsTree;
    }

    get props(): PropertyInterface[] {
        return this.conf.properties;
    }

    load(): void {
        this.settings$ = this.http.get<SettingsInterface>(`${this.url}`, {
            params: {
                format: 'json'
            }
        });
        this.settings$.subscribe(x => {
            this.conf = x;
            this.settings.next(this.conf);
            this.settings.complete();
        });
    }
}

import {Injectable} from '@angular/core';
import {AsyncSubject, Observable} from 'rxjs';
import {SettingsInterface} from '../interfaces/response/settings';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CatTreeInterface} from '../interfaces/response/cat';
import {PropInterface} from '../interfaces/response/prop';
import {Helpers} from '../helpers';
import {JwtPayloadInterface} from '../interfaces/jwt-payload';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {
    private url = environment.apiUrl;
    private conf: SettingsInterface;
    private settings$: Observable<SettingsInterface>;
    JWT: string = '';
    settings: AsyncSubject<SettingsInterface>;

    constructor(
        private http: HttpClient,
    ) {
        this.settings = new AsyncSubject;
        this.settings$ = this.settings.asObservable();
    }

    get catsTree(): CatTreeInterface {
        return this.conf.catsTree;
    }

    get props(): PropInterface[] {
        return this.conf.props;
    }

    load(): void {
        this.settings$ = this.http.get<SettingsInterface>(`${this.url}`, {
            params: {
                format: 'json'
            }
        });
        this.settings$.subscribe(
            x => {
                this.conf = x;
                this.settings.next(this.conf);
            },
            err => {
                Helpers.handleErr(err.error);
            },
            () => this.settings.complete()
        );
    }

    parseJWT(str: string): JwtPayloadInterface {
        const part: string = str.substring(0, str.indexOf('.'));
        return JSON.parse(atob(part));
    }
}

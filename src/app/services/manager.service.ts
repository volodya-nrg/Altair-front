import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SettingsInterface} from '../interfaces/response/settings';
import {AsyncSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {CatTreeInterface} from '../interfaces/response/cat';
import {Helpers} from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    private settings: SettingsInterface;
    catsTree: AsyncSubject<CatTreeInterface> = new AsyncSubject<CatTreeInterface>();

    constructor(
        private http: HttpClient,
    ) {
    }

    private load(): Observable<SettingsInterface> {
        return this.http.get<SettingsInterface>(environment.apiUrl, {
            params: {
                format: 'json'
            }
        });
    }

    getFirstSettings(): void {
        const s = this.load().subscribe(
            x => {
                this.settings = x; // на всякий случай сохраним
                this.catsTree.next(x.catsTree); // дерево пошлем по дороге
                this.catsTree.complete();
            },
            err => {
                Helpers.handleErr(err);
            },
            () => {
                s.unsubscribe();
            });
    }
}

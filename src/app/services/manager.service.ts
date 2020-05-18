import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {SettingsInterface} from '../interfaces/response/settings';
import {AsyncSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Helpers} from '../helpers';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    settings$: AsyncSubject<SettingsInterface> = new AsyncSubject<SettingsInterface>();
    tagKindNumber: string[] = ['checkbox', 'radio', 'select', 'input_number'];

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
                this.settings$.next(x); // дерево пошлем по дороге
                this.settings$.complete();
            },
            err => {
                Helpers.handleErr(err);
            },
            () => {
                s.unsubscribe();
            });
    }
}

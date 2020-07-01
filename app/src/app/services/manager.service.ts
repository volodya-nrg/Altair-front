import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {SettingsInterface} from '../interfaces/response/settings';
import {AsyncSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class ManagerService {
    settings$: AsyncSubject<SettingsInterface> = new AsyncSubject<SettingsInterface>();
    tagKindNumber: string[] = ['checkbox', 'radio', 'select', 'input_number'];

    constructor(
        private http: HttpClient,
        @Inject(PLATFORM_ID) private platformId: Object,
    ) {
    }

    private load(): Observable<SettingsInterface> {
        return this.http.get<SettingsInterface>('/api/v1');
    }

    getFirstSettings(): void {
        if (isPlatformBrowser(this.platformId)) {
            const s = this.load().subscribe(
                x => {
                    this.settings$.next(x); // дерево пошлем по дороге
                    this.settings$.complete();
                },
                err => s.unsubscribe(),
                () => s.unsubscribe());
        }
    }
}

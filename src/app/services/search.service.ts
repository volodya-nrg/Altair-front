import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SearchService {
    watchForReset: Subject<boolean>;

    constructor() {
        this.watchForReset = new Subject();
    }
}

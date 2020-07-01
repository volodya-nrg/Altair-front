import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {MyErrorInterface} from '../interfaces/my-error';

@Injectable({
    providedIn: 'root'
})
export class MyErrorService {
    errors$: Subject<MyErrorInterface>;

    constructor() {
        this.errors$ = new Subject<MyErrorInterface>();
    }
}

import {Injectable} from '@angular/core';
import {BreadcrumbsInterface} from '../interfaces/breadcrumbs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {
    sender$: BehaviorSubject<BreadcrumbsInterface[]>;

    constructor() {
        this.sender$ = new BehaviorSubject([]); // все же нужен behavior
    }
}

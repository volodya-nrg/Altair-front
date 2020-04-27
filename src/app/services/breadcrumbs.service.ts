import {Injectable} from '@angular/core';
import {BreadcrumbsInterface} from '../interfaces/breadcrumbs';
import {BehaviorSubject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BreadcrumbsService {
    bhSubject: BehaviorSubject<BreadcrumbsInterface[]>;

    constructor() {
        this.bhSubject = new BehaviorSubject([]);
    }
}

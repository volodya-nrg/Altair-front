import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthGuardService implements CanLoad, CanActivate {
    private isLoggedIn: boolean = false;

    constructor(
        private serviceAuth: AuthService,
    ) {
        this.serviceAuth.profile$.subscribe(x => {
            this.isLoggedIn = x ? true : false;
        });
    }

    canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
        if (this.isLoggedIn) {
            return true;
        }
        return false;
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.isLoggedIn) {
            return true;
        }
        return false;
    }
}

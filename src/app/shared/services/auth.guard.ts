import { Injectable } from '@angular/core';
import { CanActivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@admin/state/app.state';
import { User } from '../models/user';
import { isNullOrUndefined } from 'util';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    @Select(AppState.user)
    public user$!: Observable<User>;

    constructor(private store: Store) {}

    public canActivate(route: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): boolean {
        const user = this.store.selectSnapshot(AppState.user);

        if (isNullOrUndefined(user)) {
            return false;
        }

        return user.isAdmin;
    }

}

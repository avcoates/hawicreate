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

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    @Select(AppState.user)
    public user$!: Observable<User>;

    constructor(private store: Store,
                private router: Router) {

    }

    public canActivate(route: ActivatedRouteSnapshot,
                       state: RouterStateSnapshot): boolean {
        const user = this.store.selectSnapshot(AppState.user);
        console.log('navigate to: ', route.toString());
        if (user === null) {
            this.router.navigateByUrl('log-in');
            return false;
        }
        if (user.isAdmin) {
            return true;
        }
        this.router.navigateByUrl('log-in');
        return false;
        // return this.user$.pipe(map(user => {
        //     console.log(user);
        //     if (user === null) {
        //         this.router.navigateByUrl('log-in');
        //         return false;
        //     }
        //     if (user.isAdmin) {
        //         return true;
        //     }
        //     this.router.navigateByUrl('log-in');
        //     return false;
        // }));
    }

}

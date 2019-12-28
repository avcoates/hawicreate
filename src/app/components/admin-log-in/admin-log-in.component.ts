import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@admin/state/app.state';
import { Observable } from 'rxjs';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { LogInWithGoogle, LogOut, NavigateTo } from '@admin/actions/app.actions';
import { User } from '@admin/shared/models/user';
import { tap } from 'rxjs/operators';

@Component({
    selector: 'hc-log-in',
    templateUrl: './admin-log-in.component.html',
    styleUrls: ['./admin-log-in.component.scss']
})
export class AdminLogInComponent {

    @Select(AppState.user)
    public _user!: Observable<User>;

    public get user$(): Observable<User> {
        // Navigate the user directly to home if they are logged in
        return this._user.pipe(tap(user => {
            if (user !== null) {
                this.store.dispatch(new NavigateTo('admin-home'));
            }
        }));
    }


    constructor(private store: Store,
                private artPieceDatabaseApiService: ArtPieceDatabaseApiService,
                public auth: AuthService) {
    }

    public onLogIn() {
        this.store.dispatch(new LogInWithGoogle());
    }

    public onLogOut() {
        this.store.dispatch(new LogOut());
    }
}

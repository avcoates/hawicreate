import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@admin/state/app.state';
import { Observable } from 'rxjs';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { LogInWithGoogle, LogOut, NavigateTo } from '@admin/actions/app.actions';
import { User } from '@admin/shared/models/user';
import { tap } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'hc-log-in',
    templateUrl: './admin-log-in.component.html',
    styleUrls: ['./admin-log-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLogInComponent {

    @Select(AppState.user)
    public _user!: Observable<User>;

    public get user$(): Observable<User> {
        // Navigate the user directly to home if they are logged in
        if (!isNullOrUndefined(this._user)) {
            console.log('not null');
            this.router.navigate(['admin-home']);
        }
        return this._user;
    }


    constructor(private store: Store,
                private artPieceDatabaseApiService: ArtPieceDatabaseApiService,
                public auth: AuthService,
                private router: Router) {
    }

    public onLogIn() {
        console.log('wtf');
        this.store.dispatch(new LogInWithGoogle());
    }

    public onLogOut() {
        this.store.dispatch(new LogOut());
    }
}

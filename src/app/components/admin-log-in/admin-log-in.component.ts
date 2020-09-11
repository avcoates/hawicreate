import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@admin/state/app.state';
import { Observable, from, ReplaySubject } from 'rxjs';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { UpdateUser, UpdateActiveUser } from '@admin/actions/app.actions';
import { User } from '@admin/shared/models/user';
import { tap, takeUntil, switchMap, filter } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
    selector: 'hc-log-in',
    templateUrl: './admin-log-in.component.html',
    styleUrls: ['./admin-log-in.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminLogInComponent implements OnInit {

    @Select(AppState.activeUser)
    public _user!: Observable<User>;

    public get user$(): Observable<User> {
        // Navigate the user directly to home if they are logged in
        if (!isNullOrUndefined(this._user)) {
            this.router.navigate(['admin-home']);
        }
        return this._user;
    }

    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store,
                public auth: AuthService,
                private router: Router,
                private angularFireAuth: AngularFireAuth,) {
    }

    /*
    https://github.com/firebase/firebase-js-sdk/issues/266
    */
    public ngOnInit(): void {
        from(this.angularFireAuth
                .getRedirectResult()
            )
            .pipe(
                filter(cred => !isNullOrUndefined(cred.user)),
                takeUntil(this.destroyed$),
                switchMap(credential => this.auth.updateUserData(credential.user))
            )
            .subscribe(user => this.store.dispatch(new UpdateActiveUser(user)));
    }

    public onLogIn() {
        this.auth.googleSignIn();
    }

    public onLogOut() {
        this.auth.signOut();
    }

    public requestAdmin(user: User): void {
        const requestingAdminUser = {
            ...user,
            isRequestingAdmin: true,
        };

        this.store.dispatch(new UpdateUser(requestingAdminUser));
    }
}

import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { UpdatePageRoutesFromChild,
         UpdateUser,
         GetAllUsers,
         UpdateActiveUser,
         DeleteUser
} from '../actions/app.actions';
import { NavbarRoute } from '@admin/shared/models';
import { User } from '@admin/shared/models/user';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';
import { ArtPieceState } from './art-piece.state';
import { UserApiService } from '@admin/services';
import { GalleryState } from './gallery.state';

export interface AppStateModel {
    routes: Array<NavbarRoute>;
    activeUser: User;
    users: Array<User>;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
      routes: [],
      activeUser: null,
      users: [],
    },
    children: [ArtPieceState, GalleryState]
})

export class AppState {

    @Selector()
    public static activeUser(state: AppStateModel): any {
        return state.activeUser;
    }

    @Selector()
    public static users(state: AppStateModel): Array<User> {
        return state.users;
    }

    @Selector()
    public static routes(state: AppStateModel): Array<NavbarRoute> {
        return state.routes;
    }

    constructor(private auth: AuthService,
                private firebase: FirebaseApp,
                private store: Store,
                private router: Router,
                private userApiService: UserApiService,
    ) {
        this.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.auth.getUserByUId(user.uid)
                    .subscribe(u => this.store.dispatch(new UpdateActiveUser(u)));
            }
        });
    }

    @Action(UpdatePageRoutesFromChild)
    public updagtePageRoutesFromChild({ patchState }: StateContext<AppStateModel>, { payload }: UpdatePageRoutesFromChild): void {
        patchState({
            routes: payload
        });
    }

    @Action(UpdateUser)
    public updateUser({ dispatch }: StateContext<AppStateModel>, { payload }: UpdateUser): void {
        this.userApiService.updateUser(payload).pipe(tap(() => dispatch(new GetAllUsers())));
    }

    @Action(DeleteUser)
    public deleteUser({ dispatch }: StateContext<AppStateModel>, { payload }: DeleteUser): Observable<void> {
        return this.userApiService.deleteUserById(payload)
            .pipe(tap(() => dispatch(new GetAllUsers())));
    }

    @Action(UpdateActiveUser)
    public updateActiveUser({ patchState }: StateContext<AppStateModel>, { payload }: UpdateUser): void {
        patchState({ activeUser: payload });
    }

    @Action(GetAllUsers)
    public getAllUsers({ patchState }: StateContext<AppStateModel>): Observable<Array<User>> {
        return this.userApiService.getAllUsers()
            .pipe(tap(users => patchState({ users })));
    }

}

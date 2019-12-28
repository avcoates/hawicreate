import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { UpdatePageRoutesFromChild, ChangeFeature, UpdateUser, LogInWithGoogle, LogOut, NavigateTo } from '../actions/app.actions';
import { ImagesState } from './images.state';
import { NavbarRoute } from '@admin/shared/models';
import { User } from '@admin/shared/models/user';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FirebaseAuth, FirebaseApp } from '@angular/fire';
import { Router } from '@angular/router';
import { ArtPieceState } from './art-piece.state';

export interface AppStateModel {
    routes: Array<NavbarRoute>;
    pageBase: string;
    user: User;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
      routes: [],
      pageBase: '',
      user: null
    },
    children: [ArtPieceState]
})

export class AppState {

    @Selector()
    public static user(state: AppStateModel): any {
        return state.user;
    }

    @Selector()
    public static routes(state: AppStateModel): Array<NavbarRoute> {
        return state.routes;
    }

    @Selector()
    public static pageBase(state: AppStateModel): string {
        return state.pageBase;
    }

    constructor(private auth: AuthService,
                private firebase: FirebaseApp,
                private store: Store,
                private router: Router) {
        this.firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.auth.getUserByUId(user.uid)
                    .subscribe(u => this.store.dispatch(new UpdateUser(u)));
            }
        });
    }

    @Action(UpdatePageRoutesFromChild)
    public updagtePageRoutesFromChild({ patchState }: StateContext<AppStateModel>, { payload }: UpdatePageRoutesFromChild): void {
        console.log(payload);
        patchState({
            routes: payload
        });
    }

    @Action(ChangeFeature)
    public changeFeature({ patchState }: StateContext<AppStateModel>, { payload }: ChangeFeature): void {
        patchState({
            pageBase: payload
        });
    }

    @Action(UpdateUser)
    public updateUser({ patchState }: StateContext<AppStateModel>, { payload }: UpdateUser): void {
        patchState({
            user: payload
        });
    }

    @Action(LogInWithGoogle)
    public logInWithGoogle({ dispatch }: StateContext<AppStateModel>): Observable<User> {
        return this.auth.googleSignIn()
            .pipe(
                tap(user =>  dispatch(new UpdateUser(user))),
                tap(() => {
                    dispatch(new NavigateTo('admin-home'));
                    console.log('he');
                })
            );
    }

    @Action(LogOut)
    public LogOut({ dispatch }: StateContext<AppStateModel>): void {
        this.auth.signOut();
        dispatch(new UpdateUser(null));
        this.router.navigateByUrl('log-in');
    }

    @Action(NavigateTo)
    public navigateTo({ payload }: NavigateTo): void {
        console.log('heyt');
        this.router.navigateByUrl(payload);
    }

}

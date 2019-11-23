import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdatePageRoutesFromChild, ChangeFeature, UpdateUser, LogInWithGoogle, LogOut } from '../actions/app.actions';
import { ImagesState } from './images.state';
import { NavbarRoute } from '@admin/shared/models';
import { User } from '@admin/shared/models/user';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

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
    children: [ImagesState]
})

export class AppState {

    @Selector()
    public static user(state: AppStateModel): User {
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

    constructor(private auth: AuthService) {

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
                        .pipe(tap(user => {
                            console.log(user);
                            dispatch(new UpdateUser(user));
                        }));
    }

    @Action(LogOut)
    public LogOut({ dispatch }: StateContext<AppStateModel>): void {
        this.auth.signOut();
        dispatch(new UpdateUser(null));
    }

}

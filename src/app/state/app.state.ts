import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { UpdatePageRoutesFromChild,
         UpdateUser,
         GetAllUsers,
         UpdateActiveUser,
         DeleteUser,
         InitiateDeviceListener,
         UpdateBackText,
         GetAllContactRequests,
         DeleteContactRequest,
         ArchiveContactRequest,
         RecoverContactRequest,
         GetHomePageData,
         UpdateHomePageData
} from '../actions/app.actions';
import { NavbarRoute, DeviceType, mobileDevice, tabletDevice, desktopDevice, ContactRequest, HomePage } from '@admin/shared/models';
import { User } from '@admin/shared/models/user';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserApiService, ContactRequestApiService } from '@admin/shared/services/data';
import { GalleryState } from './gallery.state';
import { ArtPieceState } from './art-piece.state';
import { PageApiService } from '@admin/shared/services/data/page-api.service';
import { Injectable } from '@angular/core';

export interface AppStateModel {
    routes: Array<NavbarRoute>;
    activeUser: User;
    users: Array<User>;
    homePage: HomePage;
    contactRequests: Array<ContactRequest>;
    deviceType: DeviceType;
    backText: { text: string, visible: boolean };
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
      routes: [],
      activeUser: null,
      users: [],
      contactRequests: [],
      homePage: null,
      deviceType: {
          mobile: true,
          tablet: false,
          desktop: false,
      },
      backText: { text: '', visible: false }
    },
    children: [ArtPieceState, GalleryState]
})

@Injectable()
export class AppState {

    @Selector()
    public static deviceType({ deviceType }: AppStateModel): DeviceType {
        return deviceType;
    }

    @Selector()
    public static homePage({ homePage }: AppStateModel): HomePage {
        return homePage;
    }

    @Selector()
    public static archivedContactRequests({ contactRequests }: AppStateModel): Array<ContactRequest> {
        return contactRequests.filter(r => r.archived);
    }

    @Selector()
    public static contactRequests({ contactRequests }: AppStateModel): Array<ContactRequest> {
        return contactRequests.filter(r => !r.archived);
    }

    @Selector()
    public static backText({ backText }: AppStateModel): { text: string, visible: boolean } {
        return backText;
    }

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
                private angularFireAuth: AngularFireAuth,
                private store: Store,
                private userApiService: UserApiService,
                private contactRequestApiService: ContactRequestApiService,
                private pageApiService: PageApiService,
    ) {
        this.angularFireAuth.onAuthStateChanged(user => {
            if (user) {
                this.auth.getUserByUId(user.uid)
                    .subscribe(u => this.store.dispatch(new UpdateActiveUser(u)));
            }
        });
    }

    @Action(UpdatePageRoutesFromChild)
    public updatePageRoutesFromChild({ patchState }: StateContext<AppStateModel>, { payload }: UpdatePageRoutesFromChild): void {
        setTimeout(() => {
            patchState({
                routes: payload
            });
        });
    }

    @Action(UpdateBackText)
    public updateBackText({ patchState }: StateContext<AppStateModel>, { payload }: UpdateBackText): void {
        setTimeout(() => {
            patchState({
                backText: payload
            });
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
        setTimeout(() => patchState({ activeUser: payload }));
    }

    @Action(GetAllUsers)
    public getAllUsers({ patchState }: StateContext<AppStateModel>): Observable<Array<User>> {
        return this.userApiService.getAllUsers()
            .pipe(tap(users => setTimeout(() => patchState({ users }))));
    }

    @Action(InitiateDeviceListener)
    public initiateDeviceListener(
        { patchState }: StateContext<AppStateModel>,
        { payload }: InitiateDeviceListener,
    ): void {
        const { tabletListener, mobileListener } = payload;
        const deviceType: DeviceType = mobileListener.matches
            ? mobileDevice
            : tabletListener.matches
            ? tabletDevice
            : desktopDevice;
        setTimeout(() => patchState({ deviceType }));

        tabletListener.addEventListener('change', ({ matches }) => {
            setTimeout(() => patchState({ deviceType: matches ? tabletDevice : desktopDevice }));
        });
        return mobileListener.addEventListener('change', ({ matches }) => {
            setTimeout(() => {
                patchState({
                    deviceType: matches
                        ? mobileDevice
                        : tabletListener.matches
                        ? tabletDevice
                        : desktopDevice,
                });
            });
        });
    }

    @Action(GetAllContactRequests)
    public getAllContactRequests({ patchState }: StateContext<AppStateModel>): Observable<Array<ContactRequest>> {
        return this.contactRequestApiService.getAllContacts()
            .pipe(tap(contactRequests => setTimeout(() => patchState({ contactRequests }))));
    }

    @Action(DeleteContactRequest)
    public deleteContactRequest({ dispatch }: StateContext<AppStateModel>, { payload }: DeleteContactRequest): Observable<void> {
        return this.contactRequestApiService.delete(payload)
            .pipe(tap(() => dispatch( new GetAllContactRequests())));
    }

    @Action(ArchiveContactRequest)
    public archiveContactRequest({ dispatch }: StateContext<AppStateModel>, { payload }: ArchiveContactRequest): Observable<void> {
        return this.contactRequestApiService.archive(payload)
            .pipe(tap(() => dispatch( new GetAllContactRequests())));
    }

    @Action(RecoverContactRequest)
    public recoverContactRequest({ dispatch }: StateContext<AppStateModel>, { payload }: RecoverContactRequest): Observable<void> {
        return this.contactRequestApiService.recover(payload)
            .pipe(tap(() => dispatch( new GetAllContactRequests())));
    }

    @Action(GetHomePageData)
    public getHomePageData({ patchState }: StateContext<AppStateModel>): Observable<HomePage> {
        return this.pageApiService.getHomePage()
            .pipe(tap((homePage) => setTimeout(() => patchState({ homePage }))));
    }

    @Action(UpdateHomePageData)
    public updateHomePageData({ dispatch }: StateContext<AppStateModel>, { payload }: UpdateHomePageData): Observable<void> {
        return this.pageApiService.uppdateHomePage(payload)
            .pipe(tap(() => dispatch( new GetHomePageData())));
    }

}

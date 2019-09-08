import { Route } from '@angular/router';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdatePageRoutesFromChild, ChangeFeature } from '../actions/app.actions';
import { NavbarRoute } from 'src/app/shared/models';
import { StringUtilities } from 'src/app/utilities/string.utilities';

export interface AppStateModel {
    routes: Array<NavbarRoute>;
    pageBase: string;
}

@State<AppStateModel>({
    name: 'app',
    defaults: {
      routes: [],
      pageBase: ''
    }
})

export class AppState {

    @Selector()
    public static routes(state: AppStateModel): Array<NavbarRoute> {
        return state.routes;
    }

    @Selector()
    public static pageBase(state: AppStateModel): string {
        return state.pageBase;
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
}

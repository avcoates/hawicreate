import { Route } from '@angular/router';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdatePageRoutesFromChild } from '../actions/base.actions';
import { NavbarRoute } from 'src/app/shared/models';
import { StringUtilities } from 'src/app/utilities/string.utilities';

export interface BaseStateModel {
    routes: Array<Route>;
}

@State<BaseStateModel>({
    name: 'base',
    defaults: {
      routes: []
    }
})

export class BaseState {

    @Selector()
    public static routes(state: BaseStateModel): Array<NavbarRoute> {
        return state.routes.map((route: Route) => new NavbarRoute(StringUtilities.capitalizeFirstLetter(route.path), route.path));
    }

    @Action(UpdatePageRoutesFromChild)
    feedAnimals({ patchState }: StateContext<BaseStateModel>, { payload }: UpdatePageRoutesFromChild): void {
        patchState({
            routes: payload
        });
    }
}

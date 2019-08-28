import { Route } from '@angular/router';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { UpdatePageRoutesFromChild } from '../actions/base.actions';

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
    public static routes(state: BaseStateModel): Array<string> {
        return state.routes.map((route: Route) => route.path);
    }

    @Action(UpdatePageRoutesFromChild)
    feedAnimals({ patchState }: StateContext<BaseStateModel>, { payload }: UpdatePageRoutesFromChild): void {
        patchState({
            routes: payload
        });
    }
}

import { NavbarRoute } from '../shared/models';

export class UpdatePageRoutesFromChild {
    static readonly type = '[child] Update Page Routes';
    constructor(public payload: Array<NavbarRoute>) {}
}

export class ChangeFeature {
    static readonly type = '[child] Change Feature';
    constructor(public payload: string) {}
}




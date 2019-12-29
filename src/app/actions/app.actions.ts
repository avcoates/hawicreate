import { NavbarRoute } from '../shared/models';
import { User } from '@admin/shared/models/user';


export class UpdatePageRoutesFromChild {
    static readonly type = '[child] Update Page Routes';
    constructor(public payload: Array<NavbarRoute>) {}
}

export class ChangeFeature {
    static readonly type = '[child] Change Feature';
    constructor(public payload: string) {}
}

export class UpdateUser {
    static readonly type = '[Admin] UpdateUser';
    constructor(public payload: User) {}
}


export class LogInWithGoogle {
    static readonly type = '[Admin] Log In With Google';
}

export class LogOut {
    static readonly type = '[Admin] Log Out';
}

export class NavigateTo {
    static readonly type = '[Admin] Navigate to';
    constructor(public payload: string) {}
}




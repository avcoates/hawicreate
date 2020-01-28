import { NavbarRoute } from '../shared/models';
import { User } from '@admin/shared/models/user';


export class UpdatePageRoutesFromChild {
    static readonly type = '[child] Update Page Routes';
    constructor(public payload: Array<NavbarRoute>) {}
}

// Users

export class UpdateUser {
    static readonly type = '[Admin] UpdateUser';
    constructor(public payload: User) {}
}

export class GetAllUsers {
    static readonly type = '[Admin] Get All Users';
}




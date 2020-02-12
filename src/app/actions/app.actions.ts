import { NavbarRoute, DeviceListener, User } from '@admin-shared/models';

export class UpdatePageRoutesFromChild {
    static readonly type = '[child] Update Page Routes';
    constructor(public payload: Array<NavbarRoute>) {}
}

export class InitiateDeviceListener {
    public static readonly type = '[Base] Initiate Device Listener';
    constructor(public readonly payload: DeviceListener) {}
}

export class UpdateBackText {
    public static readonly type = '[Base] Update Back Text';
    constructor(public readonly payload: { text: string, visible: boolean }) {}
}

// Users

export class UpdateUser {
    static readonly type = '[Admin] Update User';
    constructor(public payload: User) {}
}

export class DeleteUser {
    static readonly type = '[Admin] Delete User';
    constructor(public payload: string) {}
}

export class UpdateActiveUser {
    static readonly type = '[Admin] Update Active User';
    constructor(public payload: User) {}
}

export class GetAllUsers {
    static readonly type = '[Admin] Get All Users';
}


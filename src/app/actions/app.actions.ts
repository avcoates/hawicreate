import { NavbarRoute, DeviceListener, User, ContactRequest, HomePage } from '@shared/models';

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

// Pages

export class GetHomePageData {
    static readonly type = '[Admin] Get Home Page Data';
}

export class UpdateHomePageData {
    static readonly type = '[Admin] Update Home Page Data';
    constructor(public payload: HomePage) {}
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

export class GetAllContactRequests {
    static readonly type = '[Admin] Get All Contact Requests';
}

export class DeleteContactRequest {
    static readonly type = '[Admin] Delete ContactRequest';
    constructor(public payload: ContactRequest) {}
}

export class ArchiveContactRequest {
    static readonly type = '[Admin] Archive ContactRequest';
    constructor(public payload: ContactRequest) {}
}

export class RecoverContactRequest {
    static readonly type = '[Admin] Recover ContactRequest';
    constructor(public payload: ContactRequest) {}
}


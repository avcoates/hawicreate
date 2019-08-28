import { Route } from '@angular/compiler/src/core';

export class UpdatePageRoutesFromChild {
    static readonly type = '[child] Update Page Routes';
    constructor(public payload: Array<Route>) {}
}
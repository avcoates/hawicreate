import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '@admin/shared/models/user';
import { AppState } from '@admin/state/app.state';

@Component({
    selector: 'hc-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

    @Select(AppState.user)
    public user$!: Observable<User>;

    constructor(private store: Store) {
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }
}

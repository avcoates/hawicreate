import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { User } from '@admin/shared/models/user';
import { AppState } from '@admin/state/app.state';
import { LogInWithGoogle, LogOut } from '@admin/actions/app.actions';

@Component({
    selector: 'hc-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

    @Select(AppState.user)
    public user$!: Observable<User>;

    constructor(private store: Store,
                private artPieceDatabaseApiService: ArtPieceDatabaseApiService,
                public auth: AuthService) {
        // this.store.dispatch(new GetFeaturedPhotos());
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

    public onLogIn() {
        this.store.dispatch(new LogInWithGoogle());
    }

    public onLogOut() {
        this.store.dispatch(new LogOut());
    }

}

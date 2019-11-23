import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { AppState } from '@admin/state/app.state';
import { Observable } from 'rxjs';
import { User } from 'firebase';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { LogInWithGoogle, LogOut } from '@admin/actions/app.actions';

@Component({
    selector: 'hc-log-in',
    templateUrl: './admin-log-in.component.html',
    styleUrls: ['./admin-log-in.component.scss']
})
export class AdminLogInComponent implements OnInit {

    @Select(AppState.user)
    public user$!: Observable<User>;

    constructor(private store: Store,
                private artPieceDatabaseApiService: ArtPieceDatabaseApiService,
                public auth: AuthService) {
    }

    public ngOnInit(): void {
    }


    public onLogIn() {
        this.store.dispatch(new LogInWithGoogle());
    }

    public onLogOut() {
        this.store.dispatch(new LogOut());
    }
}

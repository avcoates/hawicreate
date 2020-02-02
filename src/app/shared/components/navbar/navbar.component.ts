import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRoute, DeviceType } from '@admin/shared/models';
import { Select } from '@ngxs/store';
import { User } from '@admin/shared/models/user';
import { Observable, combineLatest } from 'rxjs';
import { AppState } from '@admin/state/app.state';
import { AuthService } from '@admin/shared/services/auth/auth.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    @Select(AppState.activeUser)
    public user$!: Observable<User>;

    @Select(AppState.deviceType)
    public deviceType$!: Observable<DeviceType>;

    public state$: Observable<{ user: User, deviceType: DeviceType}>;

    @Input()
    public routes!: Array<NavbarRoute>;

    @Input()
    public name!: string;

    constructor(private router: Router,
                private auth: AuthService) {
    }

    public ngOnInit(): void {
        this.state$ = combineLatest([ this.user$, this.deviceType$ ])
            .pipe(map(([user, deviceType]) => ({ user, deviceType})));
    }


    public onLogOut(): void {
        this.auth.signOut();
    }

    public onNavigate(path: string): void {
        this.router.navigateByUrl(path);
    }
}

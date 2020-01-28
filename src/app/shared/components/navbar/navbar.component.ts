import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarRoute } from '@admin/shared/models';
import { Select } from '@ngxs/store';
import { User } from '@admin/shared/models/user';
import { Observable } from 'rxjs';
import { AppState } from '@admin/state/app.state';
import { AuthService } from '@admin/shared/services/auth/auth.service';

@Component({
    selector: 'hc-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

    @Select(AppState.user)
    public user$!: Observable<User>;

    @Input()
    public routes!: Array<NavbarRoute>;

    @Input()
    public name!: string;

    constructor(private router: Router,
                private auth: AuthService) {
    }


    public onLogOut(): void {
        this.auth.signOut();
    }
    public onNavigate(path: string): void {
        this.router.navigateByUrl(path);
    }
}

import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store, Select } from '@ngxs/store';
import { GetAllPhotos } from './actions/images.actions';
import { NavbarRoute, DeviceType } from './shared/models';
import { InitiateDeviceListener } from './actions/app.actions';
import { AppState } from './state/app.state';
import { Observable, combineLatest } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material';


@Component({
    selector: 'hc-admin-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @Select(AppState.activeUser)
    public user$!: Observable<User>;

    @Select(AppState.deviceType)
    public deviceType$!: Observable<DeviceType>;

    @ViewChild('sidenav', {static: false})
    public sidenav: MatSidenav;

    public state$: Observable<{ user: User, deviceType: DeviceType}>;

    public isOpened = true;

    public name = 'HawiCreate Admin';

    public routes: Array<NavbarRoute> = [
        {
            header: 'Home',
            path: 'admin-home',
        },
        {
            header: 'Gallery',
            path: 'admin-gallery',
        },
        {
            header: 'Art Pieces',
            path: 'admin-artpieces',
        },
        {
            header: 'Contact',
            path: 'admin-contact',
        },
        {
            header: 'Users',
            path: 'admin-users',
        },

    ];

    public get currentRoute(): string {
        return this.router.url;
    }

    constructor(private storage: AngularFireStorage,
                private firestore: AngularFirestore,
                private store: Store,
                private auth: AuthService,
                private router: Router) {
        this.store.dispatch([new GetAllPhotos(),
            new InitiateDeviceListener({
                mobileListener: window.matchMedia('(max-width: 600px)'),
                tabletListener: window.matchMedia('(max-width: 900px)'),
            })]);
    }

    public toggleSideNav(): void {
        this.sidenav.toggle();
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

    public onSelectPath(path: string): void {
        this.onNavigate(path);
        this.toggleSideNav();
    }
}

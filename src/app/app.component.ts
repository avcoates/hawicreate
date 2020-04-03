import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store, Select } from '@ngxs/store';
import { NavbarRoute, DeviceType } from './shared/models';
import { InitiateDeviceListener, UpdateBackText } from './actions/app.actions';
import { AppState } from './state/app.state';
import { Observable, combineLatest } from 'rxjs';
import { User } from 'firebase';
import { Router } from '@angular/router';
import { AuthService } from './shared/services/auth/auth.service';
import { map } from 'rxjs/operators';
import { MatSidenav } from '@angular/material/sidenav';
import { Location } from '@angular/common';


@Component({
    selector: 'hc-admin-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @Select(AppState.backText)
    public backText$: Observable<{ text: string, visible: boolean }>;

    @Select(AppState.activeUser)
    public user$!: Observable<User>;

    @Select(AppState.deviceType)
    public deviceType$!: Observable<DeviceType>;

    @ViewChild('sidenav')
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
                private router: Router,
                private _location: Location) {
        this.store.dispatch(
            new InitiateDeviceListener({
                mobileListener: window.matchMedia('(max-width: 600px)'),
                tabletListener: window.matchMedia('(max-width: 900px)'),
            }));
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
        this.store.dispatch(new UpdateBackText({ text: '', visible: false }));
    }

    public onSelectPath(path: string): void {
        this.onNavigate(path);
        this.toggleSideNav();
    }

    public onBack(): void {
        this._location.back();
        this.store.dispatch(new UpdateBackText({ text: '', visible: false }));
    }

    public onNavigateHome(): void {
        this.router.navigateByUrl('admin-home');
    }
}

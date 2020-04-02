import { Component, ViewChild, OnInit } from '@angular/core';
import { NavbarRoute } from '@admin/shared/models';
import { MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject, Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    @ViewChild('sidenav')
    public sidenav: MatSidenav;

    public isOpened = true;

    public routes: Array<NavbarRoute> = [
        {
            header: 'Home',
            path: 'home',
        },
        {
            header: 'Gallery',
            path: 'gallery',
        },
        {
            header: 'Contact',
            path: 'contact',
        },
    ];

    public get device$(): Observable<{ isMobile: boolean }> {
        return this._device.asObservable();
    }

    private _device = new BehaviorSubject({ isMobile: true });

    public get currentRoute(): string {
        return this.router.url;
    }

    constructor(private router: Router,
                private _location: Location) {
    }

    public ngOnInit(): void {
        const mobileListener = window.matchMedia('(max-width: 600px)');
        this._device.next({ isMobile: mobileListener.matches });

        mobileListener.addEventListener('change', ({ matches }) => {
            this._device.next({ isMobile: matches });
        });
    }

    public toggleSideNav(): void {
        this.sidenav.toggle();
    }

    public closeSideNav(): void {
        this.sidenav.close();
    }

    public onNavigateHome(): void {
        this.onNavigate('home');
        this.closeSideNav();
    }
    public onNavigate(path: string): void {
        this.router.navigateByUrl(path);
    }

    public onSelectPath(path: string): void {
        this.onNavigate(path);
        this.toggleSideNav();
    }

    public onBack(): void {
        this._location.back();
    }
}

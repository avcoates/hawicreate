import { Component } from '@angular/core';
import { NavbarRoute } from '@admin/shared/models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {

    public name = 'HawiCreate';

    public routes: Array<NavbarRoute> = [
        {
            header: 'Home',
            path: 'home'
        },
        {
            header: 'Gallery',
            path: 'gallery'
        },
        {
            header: 'Contact',
            path: 'contact'
        },
    ];
}

import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';
import { GetAllPhotos } from './actions/images.actions';
import { NavbarRoute } from './shared/models';


@Component({
    selector: 'hawicreate-admin-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    public name = 'HawiCreate Admin';

    public routes: Array<NavbarRoute> = [
        {
            header: 'Home',
            path: 'admin-home'
        },
        {
            header: 'Gallery',
            path: 'admin-gallery'
        },
        {
            header: 'Contact',
            path: 'admin-contact'
        },
    ];

    constructor(private storage: AngularFireStorage, private firestore: AngularFirestore, private store: Store) {
        this.store.dispatch(new GetAllPhotos());
    }

}

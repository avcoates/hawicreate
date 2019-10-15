import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject, from, merge } from 'rxjs';
import { FirebaseDatabase } from '@angular/fire';

import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap, switchMap, flatMap, combineAll } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { Store } from '@ngxs/store';
import { GetAllPhotos } from './actions/images.actions';


@Component({
  selector: 'hawicreate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hawicreate';



  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore, private store: Store) {
    console.log('appcomponent');
    this.store.dispatch(new GetAllPhotos());
  }

}

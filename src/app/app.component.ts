import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject, from, merge } from 'rxjs';
import { FirebaseDatabase } from '@angular/fire';

import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap, switchMap, flatMap, combineAll } from 'rxjs/operators';
import { combineLatest } from 'rxjs';


@Component({
  selector: 'hawicreate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hawicreate';
  // tslint:disable-next-line: variable-name
  private _photos = new BehaviorSubject<Array<any>>([]);

  public get photos$(): Observable<any> {
    return this._photos.asObservable();
  }

  public urls$: Observable<Array<string>>;


  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {
    console.log('appcomponent');
    
    this.urls$ = this.firestore.collection('photos')
                             .valueChanges()
                             .pipe(
                                  map(images => images.map((image: any) => this.storage.storage.refFromURL(image.path))),
                                  switchMap((refs: Array<firebase.storage.Reference>) => {
                                    return combineLatest(refs.map(ref => from(ref.getDownloadURL())));
                                  })
                            );

  }

}

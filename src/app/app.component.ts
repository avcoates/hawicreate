import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, BehaviorSubject, from } from 'rxjs';
import { FirebaseDatabase } from '@angular/fire';

import { AngularFirestore } from '@angular/fire/firestore';
import { map, tap } from 'rxjs/operators';


@Component({
  selector: 'hawicreate-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hawicreate';
  private photos$: Observable<any>;
  private url = new BehaviorSubject<string>('');
  public get url$(): Observable<string> {
    return this.url.asObservable();
  }

  private images: string[];

  private image = '';

  constructor(private storage: AngularFireStorage, private firestore: AngularFirestore) {
    console.log('appcomponent');
    this.photos$ = this.firestore.collection('photos').valueChanges();



    this.photos$.subscribe(images => images.map(image => {
      console.log(image.path.substring(28, image.path.length));
      const ref = this.storage.storage.refFromURL(image.path);

      from(ref.getDownloadURL()).subscribe(
        download => this.url.next(download));
      // const p = ref.getDownloadURL();
      // p.then(url => this.url.next(url)).catch();
    }));
  }

}

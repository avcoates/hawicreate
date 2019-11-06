import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngxs/store';

@Injectable({
  providedIn: 'root'
})
export class ImagesStorageApiService {

  constructor(private fireStorage: AngularFireStorage,
              private firestore: AngularFirestore)
  {
    //
  }

  public addImage(): void {
    //
  }

  public getAllImageNames(): void {
    return;
    // this.fireStorage.storage.
  }
}

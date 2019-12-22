import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, combineLatest, from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class ImagesApiService {

    private readonly AllPhotosConnectionString = 'photos';
    private readonly FeaturedPhotoConnectionString = 'featured_images';

    constructor(private storage: AngularFireStorage,
                private firestore: AngularFirestore) { }

    public GetAllPhotos(): Observable<Array<string>> {
        return this.firestore.collection(this.AllPhotosConnectionString)
            .valueChanges()
            .pipe(
                map(images => images.map((image: any) => this.storage.storage.refFromURL(image.path))),
                switchMap((refs: Array<firebase.storage.Reference>) => {
                    return combineLatest(refs.map(ref => from(ref.getDownloadURL())));
                })
            );
    }

    public GetFeaturedImages(): Observable<Array<string>> {
        return this.firestore.collection(this.FeaturedPhotoConnectionString)
            .valueChanges()
            .pipe(
                map(images => images.map((image: any) => this.storage.storage.refFromURL(image.path))),
                switchMap((refs: Array<firebase.storage.Reference>) => {
                    return combineLatest(refs.map(ref => from(ref.getDownloadURL())));
                })
            );
    }
}

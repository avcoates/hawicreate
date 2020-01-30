import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, combineLatest, from, of } from 'rxjs';
import { map, switchMap, filter } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';
import { Image, ImageDto } from '@admin-shared/models';
import { ImagesStorageApiService } from './images-storage-api.service';

@Injectable({
    providedIn: 'root'
})
export class ImagesApiService {

    private readonly imageCollectionString = 'Image';
    private imageCollection: AngularFirestoreCollection<Image>;

    constructor(private storage: AngularFireStorage,
                private firestore: AngularFirestore,
                private imagesStorageApiService: ImagesStorageApiService) { }

    /**
     * @description Adds an Image to the Image collection
     *              by using the Image passed back from 
     *              ImageStorageApiService.addImage(),
     *              the image here uses the same id as the storage.
     * @param file given to ImageStorageApiService and made into an image
     */
    public addImage(file: File): Observable<void> {
        return this.imagesStorageApiService.addImage(file)
            .pipe(
                switchMap(image => from(
                    this.firestore // same id for storage is used as the Image id
                            .doc(`${this.imageCollectionString}/${image.id}`)
                            .ref
                            .set(image)
                    )
                )
            );
    }

    public getImageById(id: Image): Observable<Image | null> {
        const imageDoc: AngularFirestoreDocument<Image> = this.firestore.doc(`${this.imageCollectionString}/${id}`);
        const docData = from(imageDoc.ref.get());
        return docData.pipe(filter(doc => doc.exists), map(this.toImage));
    }

    private toImage(doc: QueryDocumentSnapshot<Image>): Image  {
        const data: Image = doc.data();
        const id = doc.id;
        return {
            ...data,
            id,
        };
    }
}

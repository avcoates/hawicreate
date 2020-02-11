import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreCollection,
    AngularFirestoreDocument,
    QueryDocumentSnapshot,
    DocumentReference
} from '@angular/fire/firestore';
import { Observable, from, zip } from 'rxjs';
import { map, switchMap, filter, switchMapTo, mapTo, tap } from 'rxjs/operators';
import { Image } from '@admin-shared/models';
import { ImageStorageApiService } from './image-storage-api.service';

@Injectable({
    providedIn: 'root'
})
export class ImageApiService {

    private readonly imageCollectionString = 'Image';
    private imageCollection: AngularFirestoreCollection<Image>;

    constructor(private firestore: AngularFirestore,
                private imagesStorageApiService: ImageStorageApiService) { }

    /**
     * @description Adds an Image to the Image collection
     *              by using the Image passed back from
     *              ImageStorageApiService.addImage(),
     *              the image here uses the same id as the storage.
     * @param file given to ImageStorageApiService and made into an image
     */
    public addImage(file: File): Observable<DocumentReference> {
        return this.imagesStorageApiService.addImage(file)
            .pipe(
                switchMap(image => {
                    // same id for storage is used as the Image id
                    const imageRef = this.firestore.doc(`${this.imageCollectionString}/${image.id}`);
                    return from(imageRef.ref.set(image)).pipe(mapTo(imageRef.ref));
                })
            );
    }

    public deleteImage({ id }: Image): Observable<any> {
        return this.imagesStorageApiService.deleteImage(id)
            .pipe(switchMapTo(this.firestore.doc(`${this.imageCollectionString}/${id}`).delete()));
    }

    public deleteImageById(id: string): Observable<void> {
        const imageDoc = this.firestore.doc(`${this.imageCollectionString}/${id}`);
        return from(this.imagesStorageApiService.deleteImage(id))
            .pipe(switchMapTo(imageDoc.delete()));
    }

    public getImageById(id: string): Observable<Image | null> {
        const imageDoc: AngularFirestoreDocument<Image> = this.firestore.doc(`${this.imageCollectionString}/${id}`);
        const docData = from(imageDoc.ref.get());
        return docData.pipe(filter(doc => doc.exists), map(this.toImage));
    }

    public getImagesByIds(ids: Array<string>): Observable<Array<Image>> {
        const images$ = ids.map(id => this.getImageById(id));

        return zip(...images$);
    }

    private toImage(doc: QueryDocumentSnapshot<Image>): Image  {
        return doc.data();
    }
}

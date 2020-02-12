import { Injectable } from '@angular/core';
import {
    AngularFirestore,
    AngularFirestoreDocument,
    QueryDocumentSnapshot,
    DocumentReference
} from '@angular/fire/firestore';
import { Observable, from, zip } from 'rxjs';
import { map, switchMap, filter, switchMapTo, mapTo } from 'rxjs/operators';
import { Image } from '@admin-shared/models';
import { ImageStorageApiService } from './image-storage-api.service';

@Injectable({
    providedIn: 'root'
})
export class ImageApiService {

    private readonly imageCollectionString = 'Image';

    constructor(private firestore: AngularFirestore,
                private imagesStorageApiService: ImageStorageApiService) {}

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

    /**
     * deletes the given image
     * @param param0 iamge to delete
     */
    public deleteImage({ id }: Image): Observable<any> {
        return this.deleteImageById(id);
    }

    /**
     * @description deletes image of the given id
     * @param id of image to delete
     */
    public deleteImageById(id: string): Observable<void> {
        const imageDoc = this.getDocById(id);
        return from(this.imagesStorageApiService.deleteImage(id))
            .pipe(switchMapTo(imageDoc.delete()));
    }

    /**
     * @description get image by ud
     * @param id of image to get
     */
    public getImageById(id: string): Observable<Image | null> {
        const imageDoc = this.getDocById(id);
        return from(imageDoc.ref.get()).pipe(filter(doc => doc.exists), map(this.toImage));
    }

    /**
     * @description gets images by ids
     * @param ids of Images to get
     */
    public getImagesByIds(ids: Array<string>): Observable<Array<Image>> {
        const images$ = ids.map(id => this.getImageById(id));

        return zip(...images$);
    }

    /**
     * @description gets image document reference by id
     * @param id of image
     */
    private getDocById(id: string): AngularFirestoreDocument {
        return this.firestore.doc(`${this.imageCollectionString}/${id}`);
    }

    /**
     * @description converts document snapshot to Image
     * @param doc to convert to Image
     */
    private toImage(doc: QueryDocumentSnapshot<Image>): Image  {
        return doc.data();
    }
}

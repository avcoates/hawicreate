import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Image } from '@admin/shared/models';
import { from, Observable, forkJoin } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImageStorageApiService {

    private imagesPath = 'Images';
    private storageRef = this.afStorage.storage.ref();

    constructor(private afStorage: AngularFireStorage) { }

    // TODO: Look into not having to generate our own random Id
    /**
     * @description Uploads the given file to the Images storage with a random id
     * @param file image to upload
     * @returns Image created from downloadURL and some metadata
     */
    public addImage(file: File): Observable<Image> {
        // Generate random id
        const id = Math.random().toString(36);

        const uploadTask = this.storageRef.child(`${this.imagesPath}/${id}`).put(file);

        return from(uploadTask.then(
            (uploadSnapshot) => {
                // upload success
                return uploadSnapshot;
            },
            (error) => {
                // upload failed
                console.log(error);
            }
            )).pipe(
                switchMap(() => {
                    const imageRef = this.storageRef.child(`${this.imagesPath}/${id}`);
                    const downloadUrl$ = from(imageRef.getDownloadURL());
                    const metaData$ = from(imageRef.getMetadata());

                    return forkJoin([ downloadUrl$, metaData$ ])
                        .pipe(
                            map(([downloadUrl, { name, size, timeCreated, updated } ]) => {
                                return {
                                    name: file.name,
                                    size,
                                    created: timeCreated,
                                    updated,
                                    id: name,
                                    downloadUrl
                                };
                        }));
                })
            );
    }

    /**
     * @description delete the given id from the Images storage
     * @param id of image to delete
     */
    public deleteImage(id: string): Observable<any> {
        return from(
            this.storageRef
            .child(`${this.imagesPath}/${id}`)
            .delete()
        );
    }
}

import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Image } from '@admin/shared/models';
import { from, Observable, forkJoin } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ImageStorageApiService {

    private imagesPath = 'Images';
    private storageRef = this.afStorage.storage.ref();

    constructor(private afStorage: AngularFireStorage,
                private firestore: AngularFirestore) { }

    /**
     * @description Uploads the given file to the Images storage with a random id
     * @param file image to upload
     * @returns Image created from downloadURL and some metadata
     */
    public addImage(file: File): Observable<Image> {
        const id = Math.random().toString(36).substring(2);

        const uploadTask = this.storageRef.child(`${this.imagesPath}/${id}`).put(file);

        return from(uploadTask.then(
            (uploadSnapShot) => {
                // upload success
                return uploadSnapShot;
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

    public deleteImage(id: string): Observable<void> {
        const imageRef = this.storageRef.child(`${this.imagesPath}/${id}`);
        return from(imageRef.delete());
    }
}

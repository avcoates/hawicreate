import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload, Image } from '@admin/shared/models';
import * as firebase from 'firebase/app';
import { of, from, Observable, forkJoin } from 'rxjs';
import { map, combineLatest, switchMap, tap, switchMapTo } from 'rxjs/operators';
import { UploadTaskSnapshot } from '@angular/fire/storage/interfaces';

@Injectable({
    providedIn: 'root'
})
export class ImagesStorageApiService {

    private imagesPath = 'Images';
    // private ref: AngularFireStorageReference;
    // private task: AngularFireUploadTask;
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

    public deleteImage(): void {
        // do 
    }
    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        const obj = {
            name: upload.name,
            url: upload.url,
            key: upload.$key,
            createdAt: upload.createdAt
        };
        this.firestore.collection(this.imagesPath).add(obj);
    }

    public getAllImageNames(): void {
        return;
        // this.fireStorage.storage.
    }

    // public getAllImages(): any {
    //     this.afStorage.storage.
    // }
}

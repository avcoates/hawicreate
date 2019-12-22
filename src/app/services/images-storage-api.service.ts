import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { Upload } from '@admin/shared/models';
import * as firebase from 'firebase/app';
import { of, from } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImagesStorageApiService {

    private imagesPath = 'Images';
    private ref: AngularFireStorageReference;
    private task: AngularFireUploadTask;

    constructor(private afStorage: AngularFireStorage,
                private firestore: AngularFirestore) { }

    public addImage(file: File): void {
        const storageRef = this.afStorage.storage.ref();
        const upload = new Upload(file);
        const key = Math.random().toString(36).substring(2);

        const uploadTask = storageRef.child(`${this.imagesPath}/${key}`).put(file);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {

            },
            (error) => {
              // upload failed
              console.log(error);
            },
            () => {
                // upload success
                from(
                    storageRef
                    .child(`${this.imagesPath}/${key}`)
                    .getDownloadURL()
                ).subscribe(url => {
                    upload.url = url;
                    upload.$key = key;
                    upload.name = upload.file.name;
                    this.saveFileData(upload);
                });
            }
          );
    }

    public deleteImage(): void {
        
    }
    // Writes the file details to the realtime db
    private saveFileData(upload: Upload) {
        console.log(upload);
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
}

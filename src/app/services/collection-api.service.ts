import { Injectable } from '@angular/core';
import { Collection } from '@admin/shared/models';
import { AngularFirestoreCollection, AngularFirestore, AngularFirestoreDocument, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class CollectionApiService {

    private readonly collectionCollectionString = 'Collection';
    private collectionCollection: AngularFirestoreCollection<Collection>;

    constructor(private firestore: AngularFirestore) {
        this.collectionCollection = this.firestore.collection(this.collectionCollectionString);
    }

    /*
    public getAllCollcetions(): Observable<Array<Collection>> {
        return this.collectionCollection
            .get()
            .pipe(map(snapShot => snapShot.docs.map(toCollection)));
    }
    */

    // public getCollectionById(id: string): Observable<Collection | null> {
    //     const collecitonDoc: AngularFirestoreDocument<Collection> = this.firestore.doc(`User/${id}`);
    //     const docData = from(collecitonDoc.ref.get());
    //     return docData.pipe(filter(doc => doc.exists), map(toUser));
    // }

    // public updateUser(user: User): Observable<void> {
    //     const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${user.uid}`);
    //     const userRef = userDoc.ref;
    //     return from(userRef.update(user));
    // }

    // public deleteUserById(uid: string): Observable<void> {
    //     const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${uid}`);
    //     const userRef = userDoc.ref;
    //     return from(userRef.delete());
    // }
    private toCollection(doc: QueryDocumentSnapshot<Collection>): Collection  {
        const data: Collection = doc.data();
        const id = doc.id;
        return {
            ...data,
            id,
        };
    }
}


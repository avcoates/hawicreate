import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@admin/shared/models/user';
import { Observable, of, from } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import { toUser } from '@admin/utilities/map';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private readonly userCollectionString = 'User';
    private userCollection: AngularFirestoreCollection<User>;

    constructor(private firestore: AngularFirestore) {
        this.userCollection = this.firestore.collection(this.userCollectionString);
    }

    public getAllUsers(): Observable<Array<User>> {
        return this.userCollection
            .get()
            .pipe(map(snapShot => snapShot.docs.map(toUser)));
    }

    public getUserByUid(uid: string): Observable<User | null> {
        const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${uid}`);
        const docData = from(userDoc.ref.get());
        return docData.pipe(filter(doc => doc.exists), map(toUser));
    }

    public updateUser(user: User): Observable<void> {
        const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${user.uid}`);
        const userRef = userDoc.ref;
        return from(userRef.update(user));
    }

    public deleteUserById(uid: string): Observable<void> {
        const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${uid}`);
        const userRef = userDoc.ref;
        return from(userRef.delete);
    }
}

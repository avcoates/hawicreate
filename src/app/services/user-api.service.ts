import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { User } from '@admin/shared/models/user';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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
}

const toUser = (doc: QueryDocumentSnapshot<User>): User => {
    const data: User = doc.data();
    const uid = doc.id;

    return {
        ...data,
        uid
    };
};

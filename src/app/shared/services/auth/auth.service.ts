import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, User as afUser } from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@admin/shared/models/user';
import { tap, map, mapTo, switchMapTo } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UpdateUser, UpdateActiveUser } from '@admin/actions/app.actions';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$: Observable<User>;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private firestore: AngularFirestore,
                private store: Store,
                ) {
    }

    public googleSignIn(): void {
        const provider = new auth.GoogleAuthProvider();
        this.afAuth.auth.signInWithRedirect(provider);
    }

    public async signOut() {
        this.afAuth.auth.signOut();
        this.store.dispatch(new UpdateActiveUser(null));
        this.router.navigate(['']);
    }

    public updateUserData({ uid, email, displayName }: afUser): Observable<User> {
        const userDoc: AngularFirestoreDocument<User> = this.firestore.doc(`User/${uid}`);
        const userRef = userDoc.ref;
        const userSnapshot = from(userRef.get());

        return userSnapshot
            .pipe(
                map(userSnap => {
                    const userData: Partial<User> = {
                        ...userSnap.data(),
                        uid,
                        email,
                        displayName,
                    };

                    if (!userSnap.exists) {
                        return {
                            ...userData,
                            isAdmin: false,
                            isRequestingAdmin: false,
                        };
                    } else if (userData.isAdmin) {
                        return {
                            ...userData,
                            isRequestingAdmin: false,
                        };
                    }

                    return userData;
                }),
                tap(user => userRef.set(user, { merge: true })),
                switchMapTo(this.firestore.doc<User>(`User/${uid}`).valueChanges())
            );
    }

    public getUserByUId(uid: string): Observable<User> {
        return this.firestore.doc<User>(`User/${uid}`).valueChanges();
    }
}

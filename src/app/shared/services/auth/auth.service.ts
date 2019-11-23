import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, User as afUser } from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@admin/shared/models/user';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { UpdateUser } from '@admin/actions/app.actions';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$: Observable<User>;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private afs: AngularFirestore,
                private store: Store) {
    }

    public googleSignIn(): Observable<User> {
        const provider = new auth.GoogleAuthProvider();
        return from(this.afAuth.auth.signInWithPopup(provider))
                .pipe(switchMap(credential => this.updateUserData(credential.user)));
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }

    public updateUserData({ uid, email }: afUser): Observable<User> {
        const userRef: AngularFirestoreDocument = this.afs.doc(`User/${uid}`);

        const data = {
            email,
            uid
        };

        if (userRef) {
            userRef.set(data, { merge: true});
            return this.afs.doc<User>(`User/${uid}`).valueChanges();
        }
        // navigate: invalid
        return;
    }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { auth, User as afUser } from 'firebase/app';
import { Observable, of, from } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '@admin/shared/models/user';
import { switchMap, tap, map } from 'rxjs/operators';
import { Store } from '@ngxs/store';
import { FirebaseApp } from '@angular/fire';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public user$: Observable<User>;

    constructor(private router: Router,
                private afAuth: AngularFireAuth,
                private firestore: AngularFirestore,
                private firebase: FirebaseApp,
                private store: Store) {
    }

    public googleSignIn(): Observable<User> {
        const provider = new auth.GoogleAuthProvider();
        return from(this.afAuth.auth.signInWithRedirect(provider))
            .pipe(switchMap(() => this.firebase.auth().getRedirectResult()),
                  tap(() => console.log('hi')),
                  switchMap(credential => this.updateUserData(credential.user)),
                //   tap(() => this.router.navigateByUrl('admin-home'))
                 );
    }

    public async signOut() {
        await this.afAuth.auth.signOut();
        return this.router.navigate(['/']);
    }

    public updateUserData({ uid, email }: afUser): Observable<User> {
        const userRef: AngularFirestoreDocument = this.firestore.doc(`User/${uid}`);

        const data = {
            email,
            uid
        };

        if (userRef) {
            userRef.set(data, { merge: true});
            return this.firestore.doc<User>(`User/${uid}`).valueChanges();
        }
        // navigate: invalid
        return;
    }

    public getUserByUId(uid: string): Observable<User> {
        return this.firestore.doc<User>(`User/${uid}`).valueChanges();
    }
}

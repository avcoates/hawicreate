import { Injectable } from '@angular/core';
import { AngularFirestore, QueryDocumentSnapshot, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { HomePage } from '@admin/shared/models';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class PageApiService {

    private pageCollectionString = 'Page';
    private readonly homePageCollectionString = 'HomePage';

    constructor(private firestore: AngularFirestore) { }


    public getHomePage(): Observable<HomePage> {
        return from(
            this.getDocById(this.homePageCollectionString)
            .ref
            .get()
        ).pipe(map(this.toHomePage));
    }

    public uppdateHomePage(homePage: HomePage): Observable<void> {
        return from(
            this.getDocById(this.homePageCollectionString)
            .ref
            .update(homePage)
        );
    }

    /**
     * @description converts document snapshot to HomePage
     * @param doc to convert to HomePage
     */
    private toHomePage(doc: QueryDocumentSnapshot<HomePage>): HomePage  {
        return doc.data();
    }

    /**
     * @description gets Page document reference by id
     * @param id of image
     */
    private getDocById(id: string): AngularFirestoreDocument {
        return this.firestore.doc(`${this.pageCollectionString}/${id}`);
    }
}

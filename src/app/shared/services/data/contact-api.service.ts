import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ContactDto, Contact } from '@admin/shared/models';
import { Observable, from, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactApiService {

    private readonly contactCollectionString = 'Contact';

    constructor(private firestore: AngularFirestore) { }

    public getAllContacts(): Observable<any> {
        return this.firestore.collection(this.contactCollectionString)
            .get()
            .pipe(
                map(snapshot => snapshot.docs.map((s: QueryDocumentSnapshot<ContactDto>) => toContact(s)))
            );
    }

    public addContact(contact: ContactDto): Observable<DocumentReference> {
        return from(this.firestore.collection(this.contactCollectionString).add(contact));
    }

    public delete({ id }: Contact): Observable<void> {
        return from(this.getContactDocById(id).delete());
    }

    private getContactDocById(id: string): AngularFirestoreDocument<ContactDto> {
        return this.firestore.doc(`${this.contactCollectionString}/${id}`);
    }
}

const toContact = (doc: QueryDocumentSnapshot<ContactDto>): Contact => {
    const contactDto: ContactDto = doc.data();
    return {
        ...contactDto,
        id: doc.id
    };
};


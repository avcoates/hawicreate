import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, DocumentReference, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ContactRequestDto, ContactRequest } from '@admin/shared/models';
import { Observable, from, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ContactRequestApiService {

    private readonly contactCollectionString = 'ContactRequest';

    constructor(private firestore: AngularFirestore) { }

    public getAllContacts(): Observable<any> {
        return this.firestore.collection(this.contactCollectionString)
            .get()
            .pipe(
                map(snapshot => snapshot.docs.map((s: QueryDocumentSnapshot<ContactRequestDto>) => toContact(s)))
            );
    }

    public addContact(contact: ContactRequestDto): Observable<DocumentReference> {
        return from(this.firestore.collection(this.contactCollectionString).add(contact));
    }

    public delete({ id }: ContactRequest): Observable<void> {
        return from(this.getContactDocById(id).delete());
    }

    public archive(request: ContactRequest): Observable<void> {
        const requestDto: ContactRequestDto = {
            name: request.name,
            email: request.email,
            message: request.message,
            archived: true
        };
        return from(this.getContactDocById(request.id).update(requestDto));
    }

    public recover(request: ContactRequest): Observable<void> {
        const requestDto: ContactRequestDto = {
            name: request.name,
            email: request.email,
            message: request.message,
            archived: false
        };
        return from(this.getContactDocById(request.id).update(requestDto));
    }

    private getContactDocById(id: string): AngularFirestoreDocument<ContactRequestDto> {
        return this.firestore.doc(`${this.contactCollectionString}/${id}`);
    }
}

const toContact = (doc: QueryDocumentSnapshot<ContactRequestDto>): ContactRequest => {
    const contactDto: ContactRequestDto = doc.data();
    return {
        ...contactDto,
        id: doc.id
    };
};


import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore, DocumentReference, AngularFirestoreCollection, QueryDocumentSnapshot } from '@angular/fire/firestore';
import { ArtPiece, ArtPieceDTO } from '@admin/shared/models';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ArtPieceDatabaseApiService {

    private readonly artPieceCollectionString = 'ArtPiece';
    private artPieceCollection: AngularFirestoreCollection<ArtPiece>;

    constructor(private storage: AngularFireStorage,
                private firestore: AngularFirestore) {
        this.artPieceCollection = this.firestore.collection(this.artPieceCollectionString);
    }

    public getAll(): Observable<Array<ArtPiece>> {
        return this.firestore.collection(this.artPieceCollectionString)
            .get()
            .pipe(map(snapShot => snapShot.docs.map(toArtPiece)));
    }

    public add(artPiece: ArtPieceDTO): Observable<DocumentReference> {
        return from(this.firestore.collection(this.artPieceCollectionString).add(artPiece));
    }

    public delete(artPiece: ArtPiece): Observable<void> {
        return from(this.artPieceCollection.doc(artPiece.id).delete());
    }
}

const toArtPiece = (doc: QueryDocumentSnapshot<ArtPiece>): ArtPiece => {
    const data = doc.data();
    const id = doc.id;

    return {
        ...data,
        id
    };
};

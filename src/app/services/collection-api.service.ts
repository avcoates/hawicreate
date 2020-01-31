import { Injectable } from '@angular/core';
import { Collection, ArtPiece } from '@admin/shared/models';
import { AngularFirestoreCollection,
         AngularFirestore,
         QueryDocumentSnapshot,
         DocumentReference,
         DocumentSnapshot
} from '@angular/fire/firestore';
import { Observable, from, zip, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CollectionDto } from '@admin/shared/models/collection';
import { ArtPieceApiService } from './art-piece-api.service';

@Injectable({
    providedIn: 'root'
})
export class CollectionApiService {

    private readonly collectionCollectionString = 'Collection';
    private collectionCollection: AngularFirestoreCollection<Collection>;

    constructor(private firestore: AngularFirestore,
                private artPieceApiService: ArtPieceApiService) {
        this.collectionCollection = this.firestore.collection(this.collectionCollectionString);
    }

    public getAllCollcetions(): Observable<Array<Collection>> {
        return this.collectionCollection
            .get()
            .pipe(switchMap(snapShot => zip(snapShot.docs.map(this.toCollection))));
    }

    public getCollectionById(id: string): Observable<Collection | null> {
        const collectionDoc = this.collectionCollection.doc(id);
        const collectionRef = collectionDoc.ref;
        return from(collectionRef.get())
            .pipe(switchMap(this.toCollectionOrNull));

    }

    public updateCollection(collection: Collection): Observable<void> {
        return this.getCollectionDtoById(collection.id)
                    .pipe(
                        switchMap(collectionDto => {
                            return this.firestore
                                .doc(`${this.collectionCollectionString}/${collectionDto.id}`)
                                .set(collectionDto, { merge: true });
                        })
                    );
    }

    public getCollectionDtoById(id: string): Observable<CollectionDto | null> {
        const collectionDoc = this.collectionCollection.doc(id);
        const collectionRef = collectionDoc.ref;
        return from(collectionRef.get())
            .pipe(map(this.toCollectionDtoOrNull));
    }

    public deleteCollectionById(id: string): Observable<void> {
        return from(this.collectionCollection.doc(id).delete());
    }

    public addArtPieceRefToCollection(collectionId: string, artPieceRef: DocumentReference): Observable<void> {
        return from(this.getCollectionDtoById(collectionId)
            .pipe(
                switchMap(collection => {
                    const artPieces = collection.artPieceRefs.push(artPieceRef);
                    const updatedCollection = {
                        ...collection,
                        artPieces,
                    };
                    return this.firestore.doc(`${this.collectionCollectionString}/${collectionId}`).set(updatedCollection);
            })));
    }

    public addArtPieceToCollectionById(collectionId: string, id: string): Observable<void> {
        return this.addArtPieceRefToCollection(collectionId, this.artPieceApiService.getRefById(id));
    }

    public removeArtPieceRefFromCollectionById(collectionId: string, artPieceId: string): Observable<void> {
        const artPieceRef = this.artPieceApiService.getRefById(artPieceId);
        return from(this.getCollectionDtoById(collectionId)
        .pipe(
            switchMap(collection => {
                const artPieces = collection.artPieceRefs.filter(ref => ref.id === artPieceRef.id);
                const updatedCollection = {
                    ...collection,
                    artPieces,
                };
                return this.firestore.doc(`${this.collectionCollectionString}/${collectionId}`).set(updatedCollection);
        })));
    }

    private toCollectionDtoOrNull(docSnapshot: DocumentSnapshot<CollectionDto>): CollectionDto | null {
        if (!docSnapshot.exists) {
            return null;
        }

        const collection: CollectionDto = docSnapshot.data();

        return {
            ...collection,
            id: docSnapshot.id
        };
    }

    private toCollectionOrNull(docSnapshot: DocumentSnapshot<CollectionDto>): Observable<Collection | null> {
        if (!docSnapshot.exists) {
            return of(null);
        }

        return this.toCollection(docSnapshot);
    }

    private toCollection(doc: QueryDocumentSnapshot<CollectionDto>): Observable<Collection>  {
        const collectionDto: CollectionDto = doc.data();
        return zip(collectionDto.artPieceRefs.map(artPieceRef => this.artPieceApiService.getById(artPieceRef.id)))
            .pipe( map(artPieces => {
                return {
                    id: doc.id,
                    name: collectionDto.name,
                    description: collectionDto.description,
                    order: collectionDto.order,
                    artPieces
                };
            }));
    }
}


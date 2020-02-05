import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore,
         DocumentReference,
         AngularFirestoreCollection,
         QueryDocumentSnapshot,
         AngularFirestoreDocument,
         DocumentData
} from '@angular/fire/firestore';
import { ArtPiece, ArtPieceDto } from '@admin/shared/models';
import { Observable, from, zip } from 'rxjs';
import { map, switchMap, tap, switchMapTo } from 'rxjs/operators';
import { ImageApiService } from './image-api.service';

@Injectable({
    providedIn: 'root'
})
export class ArtPieceApiService {

    private readonly artPieceCollectionString = 'ArtPiece';
    private artPieceCollection: AngularFirestoreCollection<ArtPiece>;

    constructor(private storage: AngularFireStorage,
                private firestore: AngularFirestore,
                private imageApiService: ImageApiService) {
        this.artPieceCollection = this.firestore.collection(this.artPieceCollectionString);
    }

    public getAll(): Observable<Array<ArtPiece>> {
        return this.firestore.collection(this.artPieceCollectionString)
            .get()
            .pipe(map(snapShot => snapShot.docs.map(toArtPiece)));
    }

    public add(artPiece: Partial<ArtPieceDto>): Observable<DocumentReference> {
        if (artPiece.files.length === 0) {
            return from(this.firestore.collection(this.artPieceCollectionString).add(artPiece));
        }

        return zip(artPiece.files.map(file => this.imageApiService.addImage(file)))
            .pipe(switchMap(imageRefs => {
                const artPieceDto: ArtPieceDto = {
                    imageRefs,
                    name: artPiece.name,
                    description: artPiece.description,
                    price: artPiece.price,
                    createdDate: artPiece.createdDate,
                    size: artPiece.size,
                    isSold: artPiece.isSold,
                };
                return from(this.firestore.collection(this.artPieceCollectionString).add(artPieceDto));
            }));
    }

    public delete(artPiece: ArtPiece): Observable<void> {
        const artPieceDtoDoc = this.firestore.doc(`${this.artPieceCollectionString}/${artPiece.id}`);

        return from(artPieceDtoDoc.ref.get())
            .pipe(
                map(this.toArtPieceDto),
                tap(artPieceDto => {
                    artPieceDto.imageRefs.map(ref => this.imageApiService.deleteImageById(ref.id));
                }),
                switchMapTo(artPieceDtoDoc.delete())
        );
    }

    public update(artPiece: ArtPiece): Observable<void> {
        const artPieceDoc: AngularFirestoreDocument<ArtPieceDto> =
            this.firestore.doc(`${this.artPieceCollectionString}/${artPiece.id}`);
        const docData = from(artPieceDoc.ref.get());
        // return docData.pipe(map(this.toImage));
        return from(this.artPieceCollection.doc(artPiece.id).update(artPiece));
    }

    public getById(id: string): Observable<ArtPiece> {
        return from(this.artPieceCollection.doc(id).get())
            .pipe(map(toArtPiece));
    }

    public getRefById(id: string): DocumentReference {
        return this.firestore.doc(`${this.artPieceCollectionString}/${id}`).ref;
    }

    private toArtPieceDto(doc: QueryDocumentSnapshot<ArtPieceDto>): ArtPieceDto {
        const { imageRefs, isSold, price, name, description, size, createdDate} = doc.data();

        return {
            imageRefs,
            isSold,
            price,
            name,
            description,
            size,
            createdDate
        };
    }

}

const toArtPiece = (doc: QueryDocumentSnapshot<ArtPieceDto>): ArtPiece => {
    const { imageRefs, isSold, price, name, description, size, createdDate} = doc.data();
    const images = imageRefs.map(imageRef => this.imageApiService.getImageById(imageRef.id));
    const id = doc.id;

    return {
        images,
        id,
        isSold,
        price,
        name,
        description,
        size,
        createdDate
    };
};

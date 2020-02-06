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
import { Observable, from, zip, of } from 'rxjs';
import { map, switchMap, tap, switchMapTo } from 'rxjs/operators';
import { ImageApiService } from '.';

@Injectable({
    providedIn: 'root'
})
export class ArtPieceApiService {

    private readonly artPieceCollectionString = 'ArtPiece';
    private artPieceCollection: AngularFirestoreCollection<ArtPiece>;

    constructor(public imageApiService: ImageApiService,
                public storage: AngularFireStorage,
                public firestore: AngularFirestore
                ) {
        this.artPieceCollection = this.firestore.collection(this.artPieceCollectionString);
    }

    public getAll(): Observable<Array<ArtPiece>> {
        return this.firestore.collection(this.artPieceCollectionString)
            .get()
            .pipe(switchMap(snapshot => {
                const artPieces$ = snapshot.docs.map((s: QueryDocumentSnapshot<ArtPiece>) => this.toArtPiece(s));
                return zip(...artPieces$);
            }));
            // .pipe(map(snapShot => snapShot.docs.map(toArtPiece), tap(console.log)));
    }

    public add(artPiece: Partial<ArtPieceDto>): Observable<DocumentReference> {
        // of(artPiece.files).pipe(switchMap(files => zip(files.map(file => this.imageApiService.addImage(file)))))
        // .subscribe(console.log);

        if (artPiece.files.length === 0) {
            return from(this.firestore.collection(this.artPieceCollectionString).add(artPiece));
        }

        const imageRefs$ = artPiece.files.map(file => this.imageApiService.addImage(file));
        return zip(...imageRefs$)
            .pipe(
                tap(console.log),
                switchMap(imageRefs => {
                    const artPieceDto: ArtPieceDto = {
                        imageRefs,
                        name: artPiece.name,
                        description: artPiece.description,
                        price: artPiece.price,
                        createdDate: artPiece.createdDate,
                        width: artPiece.width,
                        height: artPiece.height,
                        isSold: artPiece.isSold,
                    };
                    return from(this.firestore.collection(this.artPieceCollectionString).add(artPieceDto));
                })
            );
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
            .pipe(switchMap(this.toArtPiece));
    }

    public getRefById(id: string): DocumentReference {
        return this.firestore.doc(`${this.artPieceCollectionString}/${id}`).ref;
    }
    
    public toArtPiece(doc: QueryDocumentSnapshot<ArtPieceDto>): Observable<ArtPiece> {
        console.log(this);
        const { imageRefs, isSold, price, name, description, width, height, createdDate} = doc.data();
        const id = doc.id;

        if (imageRefs.length === 0) {
            return of({
                images: [],
                id,
                isSold,
                price,
                name,
                description,
                width,
                height,
                createdDate
            });
        }
        const images$ = imageRefs.map(imageRef => this.imageApiService.getImageById(imageRef.id));
    
        return zip(...images$).pipe(map(images => {
            return {
                images,
                id,
                isSold,
                price,
                name,
                description,
                width,
                height,
                createdDate
            };
        }));
    }

    private toArtPieceDto(doc: QueryDocumentSnapshot<ArtPieceDto>): ArtPieceDto {
        const { imageRefs, isSold, price, name, description, width, height, createdDate} = doc.data();

        return {
            imageRefs,
            isSold,
            price,
            name,
            description,
            width,
            height,
            createdDate
        };
    }
}


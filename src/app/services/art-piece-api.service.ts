import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore,
         DocumentReference,
         AngularFirestoreCollection,
         QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { ArtPiece, ArtPieceDto } from '@admin/shared/models';
import { Observable, from, zip, of } from 'rxjs';
import { map, switchMap, switchMapTo, mapTo } from 'rxjs/operators';
import { ImageApiService } from './image-api.service';

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
            .pipe(
                switchMap(snapshot => {
                const artPieces$ = snapshot.docs.map((s: QueryDocumentSnapshot<ArtPieceDto>) => toArtPiece(s, this.imageApiService));
                return zip<Array<ArtPiece>>(...artPieces$);
                })
            );
    }

    public add(artPiece: Partial<ArtPieceDto>): Observable<DocumentReference> {

        let artPieceDto: ArtPieceDto = {
            imageIds: [],
            name: artPiece.name,
            description: artPiece.description,
            price: artPiece.price,
            createdDate: artPiece.createdDate,
            width: artPiece.width,
            height: artPiece.height,
            isSold: artPiece.isSold,
        };

        if (artPiece.files.length === 0) {
            return from(this.firestore.collection(this.artPieceCollectionString).add(artPieceDto));
        }

        const imageRefs$ = artPiece.files.map(file => this.imageApiService.addImage(file));
        return zip(...imageRefs$)
            .pipe(
                map(imageRefs => imageRefs.map(image => image.id)),
                switchMap(imageIds => {
                    artPieceDto = {
                        ...artPieceDto,
                        imageIds
                    };
                    return from(this.firestore.collection(this.artPieceCollectionString).add(artPieceDto));
                })
            );
    }

    public delete(artPiece: ArtPiece): Observable<any> {
        const deletedImages$ = artPiece.images.map(image => this.imageApiService.deleteImageById(image.id));
        return zip(...deletedImages$)
            .pipe(switchMapTo(this.getRefById(artPiece.id).delete()));
    }

    public update(artPiece: ArtPiece, filesToAdd: Array<File>, imageIdsToRemove: Array<string>): Observable<void> {
        console.log(artPiece, filesToAdd, imageIdsToRemove);
        const artPieceRef = this.getRefById(artPiece.id);

        return from(artPieceRef.get())
            .pipe(
                map(this.toArtPieceDto),
                switchMap(artPieceDto => this.addImages(artPieceDto, filesToAdd)),
                switchMap(artPieceDto => this.deleteImages(artPieceDto, imageIdsToRemove)),
                switchMap(artPieceDto => {
                    const updatedArtPiece: Partial<ArtPiece> = {
                        ...artPieceDto,
                        name: artPiece.name,
                        description: artPiece.description,
                        price: artPiece.price,
                        createdDate: new Date(artPiece.createdDate),
                        width: artPiece.width,
                        height: artPiece.height,
                        isSold: artPiece.isSold
                    };

                    return from(artPieceRef.update(updatedArtPiece));
                })
            );

    }

    public addImages(artPieceDto: ArtPieceDto, filesToAdd: Array<File>): Observable<ArtPieceDto> {
        // dont add files if there are none
        if (filesToAdd.length === 0) {
            return of(artPieceDto);
        }

        const addedImages$ = filesToAdd.map(file => this.imageApiService.addImage(file));

        return zip(...addedImages$)
            .pipe(
                map(imageRefs => {
                    return {
                        ...artPieceDto,
                        imageIds: artPieceDto.imageIds.concat(imageRefs.map(ref => ref.id))
                    };
                })
            );
    }

    private deleteImages(artPieceDto: ArtPieceDto, imageIdsToRemove: Array<string>): Observable<ArtPieceDto> {
        // dont delete image if there are none
        if (imageIdsToRemove.length === 0) {
            return of(artPieceDto);
        }

        const deletedImages$ = imageIdsToRemove.map(id => this.imageApiService.deleteImageById(id));

        return zip(...deletedImages$)
            .pipe(
                mapTo({
                        ...artPieceDto,
                        imageIds: artPieceDto.imageIds.filter(id => !imageIdsToRemove.includes(id))
                    })
            );
    }

    public getById(id: string): Observable<ArtPiece> {
        const artPieceDoc = this.firestore.doc(`${this.artPieceCollectionString}/${id}`);
        return from(artPieceDoc.ref.get())
            .pipe(switchMap((snapshot: QueryDocumentSnapshot<ArtPieceDto>) => toArtPiece(snapshot, this.imageApiService)));
    }

    public getRefById(id: string): DocumentReference {
        return this.firestore.doc(`${this.artPieceCollectionString}/${id}`).ref;
    }

    private toArtPieceDto(doc: QueryDocumentSnapshot<ArtPieceDto>): ArtPieceDto {
        const { imageIds, isSold, price, name, description, width, height, createdDate } = doc.data();

        return {
            imageIds,
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

const toArtPiece = (doc: QueryDocumentSnapshot<ArtPieceDto>, imageApiService: ImageApiService): Observable<ArtPiece> => {
    const { imageIds, isSold, price, name, description, width, height, createdDate} = doc.data();
    const id = doc.id;

    // convert TimeStamp to date (seconds => miliseconds)
    const date = new Date();
    date.setTime(createdDate.seconds * 1000);
    if (imageIds.length === 0) {
        return of({
            images: [],
            imageIds,
            id,
            isSold,
            price,
            name,
            description,
            width,
            height,
            createdDate: date
        });
    }

    return imageApiService.getImagesByIds(imageIds)
        .pipe(
            map(images => {
                return {
                    images,
                    imageIds,
                    id,
                    isSold,
                    price,
                    name,
                    description,
                    width,
                    height,
                    createdDate: date
                };
            })
        );
};



import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore,
         DocumentReference,
         QueryDocumentSnapshot,
} from '@angular/fire/firestore';
import { ArtPiece, ArtPieceDto } from '@admin/shared/models';
import { Observable, from, zip, of } from 'rxjs';
import { map, switchMap, switchMapTo, mapTo } from 'rxjs/operators';
import { ImageApiService } from './image-api.service';
import { ArtPieceActionEntity } from '@admin/actions/action-models';

@Injectable({
    providedIn: 'root'
})
export class ArtPieceApiService {

    private readonly artPieceCollectionString = 'ArtPiece';

    constructor(public imageApiService: ImageApiService,
                public storage: AngularFireStorage,
                public firestore: AngularFirestore
                ) {}

    /**
     * @description returns all artPieces and converts them from
     * artPieceDtos to ArtPieces
     */
    public getAll(): Observable<Array<ArtPiece>> {
        return this.firestore.collection(this.artPieceCollectionString)
            .get()
            .pipe(
                switchMap(snapshot => {
                const artPieces$ = snapshot.docs
                    .map((s: QueryDocumentSnapshot<ArtPieceDto>) => toArtPiece(s, this.imageApiService));
                return zip(...artPieces$);
                })
            );
    }

    /**
     * @description returns all the artPieces that are deatured
     *
     */
    public getAllFeatured(): Observable<Array<ArtPiece>> {
        return from(this.firestore.collection(this.artPieceCollectionString)
            .ref
            .where('isFeatured', '==', true)
            .get()
            )
            .pipe(
                switchMap(snapshot => {
                    const artPieces$ = snapshot.docs
                        .map((s: QueryDocumentSnapshot<ArtPieceDto>) => toArtPiece(s, this.imageApiService));
                    return zip(...artPieces$);
                    })
            );
    }

    /**
     * @description Gets the artPiece by the id given
     * @param id of the artPiece to retreive
     */
    public getById(id: string): Observable<ArtPiece> {
        return from(this.getRefById(id).get())
            .pipe(switchMap((snapshot: QueryDocumentSnapshot<ArtPieceDto>) => toArtPiece(snapshot, this.imageApiService)));
    }

    /**
     * @description adds each file within the artPieceDto (if there are any),
     * to the images collection and then adds the artPiece
     * @param artPiece partial artpiece that does not have imageIds
     */
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
            isFeatured: artPiece.isFeatured
        };

        // No need to add images if there are no Files
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

    /**
     * @description ArtPiece AND it's images will be deleted.
     * This is a cascading delete.
     * @param artPiece artPiece to be deleted
     */
    public delete(artPiece: ArtPiece): Observable<any> {
        const deletedImages$ = artPiece.images.map(image => this.imageApiService.deleteImageById(image.id));
        return zip(...deletedImages$)
            .pipe(switchMapTo(this.getRefById(artPiece.id).delete()));
    }

    /**
     * @description Adds or removes images given, updates artPiece data
     * @param param0 the artpiece, files to add and image to remove will all replace the existing artPiece
     */
    public update({ artPiece, filesToAdd, imageIdsToRemove }: ArtPieceActionEntity): Observable<void> {
        const artPieceRef = this.getRefById(artPiece.id);

        return from(artPieceRef.get())
            .pipe(
                map(this.toArtPieceDto),
                switchMap(artPieceDto => this.addImages(artPieceDto, filesToAdd)),
                switchMap(artPieceDto => this.deleteImages(artPieceDto, imageIdsToRemove)),
                switchMap(artPieceDto => {

                    // Replacing everythin except the imageIds (already up to date via previous maps)
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

    /**
     * @description returns a doument reference of the
     * artPiece specified by the given id
     * @param id of artPiece in the collection
     */
    public getRefById(id: string): DocumentReference {
        return this.firestore.doc(`${this.artPieceCollectionString}/${id}`).ref;
    }

    /**
     * Adds files to the image collection and then pushes
     * those newly added image ids to the artPieceDto.imageIds
     * @param artPieceDto will be updated with new imgaeIds
     * @param filesToAdd will be added to image collection and
     * the ids will be pushed to the artPieceDto.imageIds
     */
    private addImages(artPieceDto: ArtPieceDto, filesToAdd: Array<File>): Observable<ArtPieceDto> {
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

    /**
     * @description updates the given artPieceDto by deleting
     * the specified imageIds from the images collection and removing
     * them from the artPieceDto.imageIds
     * @param artPieceDto will have imageIds removed
     * @param imageIdsToRemove will delete these images from the
     * image collection and remove them from the given artPieceDto
     */
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

    /**
     * @description gets the data from a snapshot and forms it into a artPieceDto
     * @param doc raw doument snapshot to be converted
     */
    private toArtPieceDto(doc: QueryDocumentSnapshot<ArtPieceDto>): ArtPieceDto {
        const { imageIds, isSold, price, name, description, width, height, createdDate, isFeatured } = doc.data();

        return {
            imageIds,
            isSold,
            price,
            name,
            description,
            width,
            height,
            createdDate,
            isFeatured
        };
    }

}

/**
 * @description gets the document snapshot data and pulls each imageId
 * to return a full ArtPiece
 * @param doc will be converted to an ArtPiece
 * @param imageApiService used to get the iamges
 */
const toArtPiece = (doc: QueryDocumentSnapshot<ArtPieceDto>, imageApiService: ImageApiService): Observable<ArtPiece> => {
    const { imageIds, isSold, price, name, description, width, height, createdDate, isFeatured } = doc.data();
    const id = doc.id;

    // convert TimeStamp to date (seconds => miliseconds)
    const date = new Date();
    date.setTime(createdDate.seconds * 1000);


    const artPiece = {
        images: [],
        imageIds,
        id,
        isSold,
        isFeatured,
        price,
        name,
        description,
        width,
        height,
        createdDate: date
    };

    if (imageIds.length === 0) {
        return of(artPiece);
    }

    return imageApiService.getImagesByIds(imageIds)
        .pipe(
            map(images => {
                return {
                    ...artPiece,
                    images
                };
            })
        );
};



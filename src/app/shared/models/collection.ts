import { ArtPiece } from './art-piece';
import { DocumentReference } from '@angular/fire/firestore';

export interface Collection {
    id: string;
    name: string;
    description: string;
    order: number;
    artPieces: Array<ArtPiece>;
}

export interface CollectionDto {
    id: string;
    name: string;
    description: string;
    order: number;
    artPieceRefs: Array<DocumentReference>;
}

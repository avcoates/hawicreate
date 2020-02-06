import { Image, ImageDto } from './image';
import { DocumentReference } from '@angular/fire/firestore';

export interface ArtPiece {
    id: string;
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    images: Array<Image>;
    width: number;
    height: number;
    isSold: boolean;
}

export interface ArtPieceDto {
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    imageRefs?: Array<DocumentReference>;
    files?: Array<File>;
    width: number;
    height: number;
    isSold: boolean;
}

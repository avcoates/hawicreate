import { Image, ImageDto } from './image';
import { DocumentReference } from '@angular/fire/firestore';

export interface ArtPiece {
    id: string;
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    images: Array<Image>;
    size: string;
    isSold: boolean;
}

export interface ArtPieceDto {
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    imageRefs?: Array<DocumentReference>;
    files?: Array<File>;
    size: string;
    isSold: boolean;
}

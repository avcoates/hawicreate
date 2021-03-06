import { Image, ImageDto } from './image';
import { DocumentReference } from '@angular/fire/firestore';

export interface ArtPiece {
    id: string;
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    addedDate: Date;
    images: Array<Image>;
    width: number;
    height: number;
    isSold: boolean;
    isFeatured: boolean;
}

export interface ArtPieceDto {
    name: string;
    description: string;
    price: number;
    createdDate: { seconds: number, nanoseconds: number };
    addedDate: { seconds: number, nanoseconds: number };
    imageIds: Array<string>;
    files?: Array<File>;
    width: number;
    height: number;
    isSold: boolean;
    isFeatured: boolean;
}

import { ArtPiece } from './art-piece';

export class Collection {
    public id: string;
    public name = '';
    public description = '';
    public order = -1;
    public artPeices = new Array<ArtPiece>();
}

import { ArtPiece } from './art-piece';

export class Collection {
    public name = '';
    public description = '';
    public order = -1;
    public artPeices = new Array<ArtPiece>();
}

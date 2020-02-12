import { ArtPiece } from '@admin/shared/models';

export interface ArtPieceActionEntity {
    artPiece: ArtPiece;
    filesToAdd: Array<File>;
    imageIdsToRemove: Array<string>;
}


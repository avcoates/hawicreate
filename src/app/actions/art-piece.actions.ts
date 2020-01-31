import { ArtPiece, ArtPieceDto } from '@admin/shared/models';

export class GetAllArtPieces {
    static readonly type = '[ArtPiece] Get all';
}

export class AddArtPiece {
    static readonly type = '[ArtPiece] Add';
    constructor(public payload: ArtPieceDto) {}
}

export class UpdateArtPiece {
    static readonly type = '[ArtPiece] Update';
    constructor(public payload: ArtPiece) {}
}

export class DeleteArtPiece {
    static readonly type = '[ArtPiece] Delete';
    constructor(public payload: ArtPiece) {}
}

export class UpdateSelectedArtPiece {
    static readonly type = '[ArtPiece] Update active';
    constructor(public payload: ArtPiece) {}
}

export class ClearSelectedArtPiece {
    static readonly type = '[ArtPiece] Clear active';
}




import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ArtPiece } from '@admin/shared/models';
import {
        GetAllArtPieces,
        AddArtPiece,
        DeleteArtPiece,
        UpdateArtPiece,
        UpdateSelectedArtPiece,
        ClearSelectedArtPiece
} from '@admin/actions/art-piece.actions';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { DocumentReference } from '@angular/fire/firestore';

export interface ArtPieceStateModel {
    artPieces: Array<ArtPiece>;
    selectedArtPiece: ArtPiece;
}

@State<ArtPieceStateModel>({
    name: 'images',
    defaults: {
        artPieces: [],
        selectedArtPiece: new ArtPiece()
    }
})
export class ArtPieceState {
    @Selector()
    public static artPieces(state: ArtPieceStateModel): Array<ArtPiece> {
        return state.artPieces;
    }

    @Selector()
    public static selectedArtPiece(state: ArtPieceStateModel): ArtPiece {
        return state.selectedArtPiece;
    }

    constructor(private artPiecesService: ArtPieceDatabaseApiService) {}

    @Action(GetAllArtPieces)
    public getAllArtPieces({ patchState }: StateContext<ArtPieceStateModel>): Observable<Array<ArtPiece>> {
        return this.artPiecesService.getAll()
            .pipe(tap(artPieces => patchState({ artPieces })));
    }

    @Action(AddArtPiece)
    public addArtPiece({ dispatch }: StateContext<ArtPieceStateModel>, { payload }: AddArtPiece): Observable<DocumentReference> {
        return this.artPiecesService.add(payload)
            .pipe(tap(() => dispatch(new GetAllArtPieces())));
    }

    @Action(DeleteArtPiece)
    public deleteArtPiece({ dispatch }: StateContext<ArtPieceStateModel>, { payload }: DeleteArtPiece): Observable<void> {
        return this.artPiecesService.delete(payload)
            .pipe(tap(() => dispatch(new GetAllArtPieces())));
    }

    @Action(UpdateArtPiece)
    public updateArtPiece({ dispatch }: StateContext<ArtPieceStateModel>, { payload }: UpdateArtPiece): Observable<void> {
        return this.artPiecesService.update(payload)
            .pipe(tap(() => dispatch(new GetAllArtPieces())));
    }

    @Action(UpdateSelectedArtPiece)
    public updateSelectedArtPiece({ patchState }: StateContext<ArtPieceStateModel>, { payload }: UpdateSelectedArtPiece): void {
        patchState({
            selectedArtPiece: payload
        });
    }

    @Action(ClearSelectedArtPiece)
    public clearSelectedArtPiece({ patchState }: StateContext<ArtPieceStateModel>): void {
        patchState({
            selectedArtPiece: new ArtPiece()
        });
    }


}




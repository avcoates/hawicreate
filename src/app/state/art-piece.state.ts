
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
        ClearSelectedArtPiece,
        RefreshSelectedArtPiece
} from '@admin/actions/art-piece.actions';
import { ArtPieceApiService } from '@admin/services';
import { DocumentReference } from '@angular/fire/firestore';

export interface ArtPieceStateModel {
    artPieces: Array<ArtPiece>;
    selectedArtPiece: ArtPiece;
}

@State<ArtPieceStateModel>({
    name: 'images',
    defaults: {
        artPieces: [],
        selectedArtPiece: null
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

    constructor(private artPiecesService: ArtPieceApiService) {}

    @Action(GetAllArtPieces)
    public getAllArtPieces({ patchState }: StateContext<ArtPieceStateModel>): Observable<Array<ArtPiece>> {
        return this.artPiecesService.getAll()
            .pipe(tap(artPieces => patchState({ artPieces })));
    }
    
    @Action(RefreshSelectedArtPiece)
    public refreshSelectedArtPiece({ patchState, getState }: StateContext<ArtPieceStateModel>): Observable<ArtPiece> {
        const { artPieces, selectedArtPiece } = getState();
        
        return this.artPiecesService.getById(selectedArtPiece.id)
            .pipe(
                tap((artPiece) => patchState({ selectedArtPiece: artPiece }))
            );
    }
    @Action(AddArtPiece)
    public addArtPiece({ dispatch }: StateContext<ArtPieceStateModel>, { payload }: AddArtPiece): Observable<DocumentReference> {
        return this.artPiecesService.add(payload)
            .pipe(tap(() => dispatch(new GetAllArtPieces())));
    }

    @Action(DeleteArtPiece)
    public deleteArtPiece({ dispatch }: StateContext<ArtPieceStateModel>, { payload }: DeleteArtPiece): Observable<any> {
        return this.artPiecesService.delete(payload)
            .pipe(tap(() => dispatch(new GetAllArtPieces())));
    }

    @Action(UpdateArtPiece)
    public updateArtPiece(
        { dispatch }: StateContext<ArtPieceStateModel>,
        { payload: { artPiece, filesToAdd, imageIdsToRemove} }: UpdateArtPiece
    ): Observable<void> {
        return this.artPiecesService.update(artPiece, filesToAdd, imageIdsToRemove)
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
            selectedArtPiece: null
        });
    }


}




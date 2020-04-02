import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store, Actions } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArtPiece, ArtPieceDto } from '@admin/shared/models';
import { GetAllArtPieces, UpdateSelectedArtPiece, AddArtPiece } from '@admin/actions/art-piece.actions';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { NewArtPieceDialogComponent } from '../dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { isNullOrUndefined } from 'util';
import { ArtPieceState } from '@admin/state/art-piece.state';
import { SnackBarService } from '@admin/shared/services';

@Component({
    selector: 'hc-admin-gallery',
    templateUrl: './admin-gallery.component.html',
    styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit, OnDestroy {

    @Select(ArtPieceState.artPieces)
    public artPieces$!: Observable<Array<ArtPiece>>;

    constructor(private store: Store,
                private router: Router,
                private matDialog: MatDialog,
                private actions: Actions,
                private snackBarService: SnackBarService
                ) { }


    public ngOnInit(): void {
        this.store.dispatch(new GetAllArtPieces());

        this.actions
        .pipe(
            filter(action => action.action instanceof AddArtPiece),
            untilDestroyed(this)
        )
        .subscribe(action => {
            if (action.status === 'SUCCESSFUL') {
                this.snackBarService.openSnackBar('Art piece added successfully!');
            } else if (action.status === 'ERRORED' || action.status === 'CANCELED') {
                this.snackBarService.openSnackBar('There was a problem added the art piece');
            }
        });
    }

    public ngOnDestroy(): void {
        // Neccessary for UntilDestroyed()
    }

    public onAdd(): void {
        const dialogRef = this.matDialog.open<NewArtPieceDialogComponent, null, ArtPieceDto>(NewArtPieceDialogComponent, {
            maxWidth: '383px',
        });

        dialogRef.afterClosed()
            .pipe(untilDestroyed(this), filter(val => !isNullOrUndefined(val)))
            .subscribe(artPieceDto => this.store.dispatch(new AddArtPiece(artPieceDto)));
    }

    public onNavigateTo(artPiece: ArtPiece): void {
        this.store.dispatch(new UpdateSelectedArtPiece(artPiece));
        this.router.navigate(['admin-artpiece', artPiece.id]);
    }

}


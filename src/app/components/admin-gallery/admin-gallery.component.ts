import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ArtPiece, Collection, ArtPieceDto } from '@admin/shared/models';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { GetAllArtPieces, UpdateSelectedArtPiece, AddArtPiece } from '@admin/actions/art-piece.actions';
import { Router } from '@angular/router';
import { CollectionApiService } from '@admin/services/collection-api.service';
import { tap, filter } from 'rxjs/operators';
import { ImageApiService } from '@admin/services/image-api.service';
import { GalleryState } from '@admin/state/gallery.state';
import { GetAllCollections } from '@admin/actions/gallery.actions';
import { MatDialog } from '@angular/material';
import { NewArtPieceDialogComponent } from '../dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { isNullOrUndefined } from 'util';
import { ArtPieceState } from '@admin/state/art-piece.state';

@Component({
    selector: 'hc-admin-gallery',
    templateUrl: './admin-gallery.component.html',
    styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit, OnDestroy {

    @Select(ArtPieceState.artPieces)
    public artPieces$!: Observable<Array<ArtPiece>>;

    constructor(private fb: FormBuilder,
                private store: Store,
                private router: Router,
                private collectionApiService: CollectionApiService,
                private matDialog: MatDialog,
                ) { }


    public ngOnInit(): void {
        this.store.dispatch(new GetAllArtPieces());
        // this.collectionApiService.getAllCollcetions().pipe(tap(console.log)).subscribe();
        // this.onAddImage();
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


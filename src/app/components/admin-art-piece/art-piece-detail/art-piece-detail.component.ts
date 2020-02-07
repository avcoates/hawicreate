import { Component, OnInit, Input, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ArtPiece } from '@admin/shared/models';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { ClearSelectedArtPiece, DeleteArtPiece, UpdateArtPiece } from '@admin/actions/art-piece.actions';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { Location } from '@angular/common';
import { ArtPieceState } from '@admin/state/art-piece.state';

@Component({
    selector: 'hc-art-piece-detail',
    templateUrl: './art-piece-detail.component.html',
    styleUrls: ['./art-piece-detail.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtPieceDetailComponent implements OnInit, OnDestroy {

    public artPiece: ArtPiece;

    public get name(): AbstractControl {
        return this.artPieceForm.get('name');
    }

    public get width(): AbstractControl {
        return this.artPieceForm.get('width');
    }

    public get height(): AbstractControl {
        return this.artPieceForm.get('height');
    }

    public get price(): AbstractControl {
        return this.artPieceForm.get('price');
    }

    public get description(): AbstractControl {
        return this.artPieceForm.get('description');
    }

    public get createdDate(): AbstractControl {
        return this.artPieceForm.get('createdDate');
    }

    public get images(): FormArray {
        return this.artPieceForm.get('images') as FormArray;
    }

    public artPieceForm = this.fb.group({
        name: ['', [Validators.required]],
        description: '',
        price: [, [Validators.required]],
        createdDate: [new Date(), [Validators.required]],
        width: ['', [Validators.required]],
        height: ['', [Validators.required]],
        isSold: [false, [Validators.required]],
        images: this.fb.array([])
    });

    private filesToAdd: Array<File> = [];
    private imageIdsToDelete: Array<string> = [];

    constructor(private fb: FormBuilder,
                private store: Store,
                private _location: Location) {
    }

    public ngOnInit(): void {
        this.initializeArtPieceForm();
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ClearSelectedArtPiece());
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteArtPiece(this.artPiece));
        this._location.back();
    }

    public onUpdate(): void {
        // const newArtPiece = {
        //     ...this.artPiece,
        //     ...this.artPieceForm.getRawValue()
        // };
        // this.store.dispatch(new UpdateArtPiece(newArtPiece));
    }

    private initializeArtPieceForm(): void {
        this.artPiece = this.store
                            .selectSnapshot(ArtPieceState)
                            .selectedArtPiece;

        const imagesArray: FormArray = this.fb.array([]);

        this.artPiece.images.forEach(({ id, name, size, created, updated, downloadUrl} ) => {
            imagesArray.push(
                this.fb.group({
                    id,
                    name,
                    size,
                    created,
                    updated,
                    downloadUrl
                })
            );
        });

        this.artPieceForm = this.fb.group({
            name: [this.artPiece.name, [Validators.required]],
            description: [this.artPiece.description, [Validators.required]],
            price: [this.artPiece.price, [Validators.required]],
            createdDate: [this.artPiece.createdDate, [Validators.required]],
            width: [this.artPiece.width, [Validators.required]],
            height: [this.artPiece.height, [Validators.required]],
            isSold: [this.artPiece.isSold, [Validators.required]],
            images: imagesArray
        });
    }
}

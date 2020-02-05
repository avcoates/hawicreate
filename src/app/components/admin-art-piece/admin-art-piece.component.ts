import { Component, OnInit, Input } from '@angular/core';
import { ArtPiece } from '@admin/shared/models';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { UpdateSelectedArtPiece, ClearSelectedArtPiece, DeleteArtPiece, UpdateArtPiece } from '@admin/actions/art-piece.actions';
import { AbstractControl, FormArray, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ArtPieceState } from '@admin/state/art-piece.state';
import { isNullOrUndefined } from 'util';

@Component({
    selector: 'hc-admin-art-piece',
    templateUrl: './admin-art-piece.component.html',
    styleUrls: ['./admin-art-piece.component.scss']
})
export class AdminArtPieceComponent implements OnInit {

    @Input()
    public artPiece: ArtPiece;

    public get name(): AbstractControl {
        return this.artPieceForm.get('name');
    }

    public get size(): AbstractControl {
        return this.artPieceForm.get('size');
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
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        createdDate: ['', [Validators.required]],
        size: ['', [Validators.required]],
        isSold: [false, [Validators.required]],
        images: this.fb.array([])
    });

    isSold: boolean;

    private isNewArtPiece: boolean;

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store,
                private _location: Location) {
    }

    public ngOnInit(): void {
        this.isNewArtPiece = isNullOrUndefined(this.artPiece);

        if (!this.isNewArtPiece) {
            this.initializeArtPieceForm();
        }
    }


    public onDelete(): void {
        this.store.dispatch(new DeleteArtPiece(this.artPiece));
    }

    public onUpdate(): void {
        const newArtPiece = {
            ...this.artPiece,
            ...this.artPieceForm.getRawValue()
        };
        this.store.dispatch(new UpdateArtPiece(newArtPiece));
    }

    private initializeArtPieceForm(): void {

        const imagesArray: FormArray = this.fb.array([]);

        this.artPiece.images.forEach(image => {
            imagesArray.push(
                this.fb.group({
                    downloadUrl: [image.downloadUrl, [Validators.required]]
                })
            );
        });

        this.artPieceForm = this.fb.group({
            name: [this.artPiece.name, [Validators.required]],
            description: [this.artPiece.description, [Validators.required]],
            price: [this.artPiece.price, [Validators.required]],
            createdDate: [this.artPiece.createdDate, [Validators.required]],
            size: [this.artPiece.size, [Validators.required]],
            images: imagesArray
        });
    }
}

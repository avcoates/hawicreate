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

    private id: string;

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
        images: this.fb.array([])
    });

    constructor(private fb: FormBuilder,
                private route: ActivatedRoute,
                private store: Store,
                private _location: Location) {
    }

    public ngOnInit(): void {
        this.route.params.subscribe(params => {
            this.id = params.id;
        });
        this.initializeArtPieceForm();
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ClearSelectedArtPiece());
    }

    public getUrl(image: FormGroup): string {
        return image.get('url').value.url;
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteArtPiece(this.artPiece));
        this._location.back();
    }

    public onUpdate(): void {
        const newArtPiece = {
            ...this.artPiece,
            ...this.artPieceForm.getRawValue()
        };
        this.store.dispatch(new UpdateArtPiece(newArtPiece));
    }

    private initializeArtPieceForm(): void {
        this.artPiece = this.store
                            .selectSnapshot(ArtPieceState)
                            .selectedArtPiece;

        const imagesArray: FormArray = this.fb.array([]);

        this.artPiece.images.forEach(image => {
            imagesArray.push(
                this.fb.group({
                    url: [image, [Validators.required]]
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

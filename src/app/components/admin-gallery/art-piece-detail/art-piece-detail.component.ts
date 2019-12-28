import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ArtPiece } from '@admin/shared/models';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { ClearSelectedArtPiece, DeleteArtPiece } from '@admin/actions/art-piece.actions';
import { ArtPieceState } from '@admin/state/art-piece.state';
import { Observable } from 'rxjs';
import { TouchSequence } from 'selenium-webdriver';
import { Location } from '@angular/common';

@Component({
    selector: 'hc-art-piece-detail',
    templateUrl: './art-piece-detail.component.html',
    styleUrls: ['./art-piece-detail.component.scss']
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
        images: this.fb.array([ this.fb.group({ url: ''})])
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

        const { selectedArtPiece } = this.store.selectSnapshot(ArtPieceState);
        this.artPiece = selectedArtPiece;

        console.log(this.artPiece);
        const imagesArray: FormArray = this.fb.array([]);

        this.artPiece.images.forEach(image => {
            const form = this.fb.group({
                url: image
            });
            imagesArray.push(new FormControl(form));
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

    public ngOnDestroy(): void {
        this.store.dispatch(new ClearSelectedArtPiece());
    }

    public onClick(): void {
        console.log('hey');
    }

    public getUrl(image: FormGroup): string {
        console.log(image.value.get('url').value);
        return image.value.get('url').value.url;
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteArtPiece(this.artPiece));
        this._location.back();
    }
}

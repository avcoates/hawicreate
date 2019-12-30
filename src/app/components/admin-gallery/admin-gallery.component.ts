import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesState } from '@admin/state/images.state';
import { ArtPieceDTO, ArtPiece, Upload } from '@admin/shared/models';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { ImagesStorageApiService } from '@admin/services/images-storage-api.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormArray } from '@angular/forms';
import { ArtPieceState } from '@admin/state/art-piece.state';
import { GetAllArtPieces, UpdateSelectedArtPiece, AddArtPiece } from '@admin/actions/art-piece.actions';
import { map } from 'rxjs/operators';
import { NavigateTo } from '@admin/actions/app.actions';
import { Router } from '@angular/router';
import { Url } from 'url';

@Component({
    selector: 'hc-admin-gallery',
    templateUrl: './admin-gallery.component.html',
    styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {

    @Select(ArtPieceState.artPieces)
    public artPieces$: Observable<Array<ArtPiece>>;

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

    public get images(): FormArray  {
        return this.artPieceForm.get('images') as FormArray;
    }

    public artPieceForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required]],
        createdDate: ['', [Validators.required]],
        images: this.fb.array([]),
        size: ['', [Validators.required]],
    });

    constructor(private fb: FormBuilder,
                private store: Store,
                private router: Router) { }


    public ngOnInit(): void {
        this.store.dispatch(new GetAllArtPieces());
        // this.onAddImage();
    }

    public getField(fieldName: string, form: FormGroup): any {
        console.log(form.get(fieldName));
        return form.get(fieldName).value;
    }

    public onNavigateTo(artPiece: ArtPiece): void {
        this.router.navigate(['admin-gallery', artPiece.id]);
        this.store.dispatch(new UpdateSelectedArtPiece(artPiece));
    }

    public onAdd(): void {
        this.store.dispatch(new AddArtPiece(this.artPieceForm.getRawValue()));
    }

    public onAddImage(): void {
        const image = this.fb.group({
            url: ''
        });

        this.images.push(image);
    }

    public onDeleteImage(index: number): void {
        this.images.removeAt(index);
    }



}

const toArtPieceForm = (artPiece: ArtPiece): FormGroup => {
    const formBuilder = new FormBuilder();
    return formBuilder.group({
        id: artPiece.id,
        name: artPiece.name,
        description: artPiece.description,
        price: artPiece.price,
        createdDate: artPiece.createdDate,
        images: artPiece.images,
        size: artPiece.size
    });
};


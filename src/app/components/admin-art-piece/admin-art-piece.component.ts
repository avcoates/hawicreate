import { AbstractControl, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ArtPiece } from '@admin/shared/models';
import { Store, Actions, Select } from '@ngxs/store';
import { ClearSelectedArtPiece, DeleteArtPiece, UpdateArtPiece, RefreshSelectedArtPiece } from '@admin/actions/art-piece.actions';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { Location } from '@angular/common';
import { ArtPieceState } from '@admin/state/art-piece.state';
import { UpdateBackText } from '@admin/actions/app.actions';
import { map, tap, filter, mapTo } from 'rxjs/operators';
import { ImageUploadComponent } from '../image-upload/image-upload.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Component, ChangeDetectionStrategy, OnInit, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector: 'hc-art-piece',
    templateUrl: './admin-art-piece.component.html',
    styleUrls: ['./admin-art-piece.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminArtPieceComponent implements OnInit, OnDestroy {

    @Select(ArtPieceState.selectedArtPiece)
    public selectedArtPiece$: Observable<ArtPiece>;

    @ViewChild('hcupload', { static: false })
    public hcUpload!: ImageUploadComponent;

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

    public get isSold(): AbstractControl {
        return this.artPieceForm.get('isSold');
    }

    public get filesHaveChanges$(): Observable<boolean> {
        return this.filesToAdd$
            .pipe(
                map(filesToAdd => filesToAdd.length > 0)
            );
    }

    public state$!: Observable<{ filesHaveChanges: boolean, selectedArtPiece: ArtPiece }>;
    // public state$!: Observable<{ filesHaveChanges: boolean, formStatus: { dirty: boolean, valid: boolean } }>;

    public artPieceForm = this.fb.group({
        name: ['', [Validators.required]],
        description: '',
        price: [, [Validators.required]],
        createdDate: [new Date(), [Validators.required]],
        width: ['', [Validators.required, Validators.min(1)]],
        height: ['', [Validators.required, Validators.min(1)]],
        isSold: [false, [Validators.required]],
        images: this.fb.array([])
    });

    public get filesToAdd$(): Observable<Array<File>> {
         return this.filesToAdd.asObservable();
    }

    private filesToAdd = new BehaviorSubject<Array<File>>([]);

    constructor(private fb: FormBuilder,
                private store: Store,
                private _location: Location,
                private actions: Actions) {
    }

    public ngOnInit(): void {
        this.initializeArtPieceForm();
        this.store.dispatch(new UpdateBackText({ text: 'Gallery', visible: true }));

        this.state$ = combineLatest([
                this.filesHaveChanges$,
                this.selectedArtPiece$
        ])
        .pipe(
            map(([filesHaveChanges, selectedArtPiece]) => {
                return { filesHaveChanges, selectedArtPiece };
            }),
        );
        // this.state$ = combineLatest([
        //         this.filesHaveChanges$,
        //         this.artPieceForm.statusChanges
        //             .pipe(mapTo({ dirty: this.artPieceForm.dirty, valid: this.artPieceForm.valid }))
        // ])
        // .pipe(
        //     map(([filesHaveChanges, formStatus]) => {
        //         return { filesHaveChanges, formStatus };
        //     }),
        // );

        this.actions
            .pipe(
                filter(action => action.action instanceof UpdateArtPiece),
                filter(action => action.status === 'SUCCESSFUL'),
                untilDestroyed(this)
            )
            .subscribe(() => {
                this.store.dispatch(new RefreshSelectedArtPiece());
                this.hcUpload.clearFiles();
            });

    }

    public imageIsProcessOfDelete(image: FormControl, ids: Array<string>): boolean {
        return !ids.includes(image.get('downloadUrl').value);
    }

    public ngOnDestroy(): void {
        this.store.dispatch(new ClearSelectedArtPiece());
    }

    public onDelete(): void {
        this.store.dispatch(new DeleteArtPiece(this.artPiece));
        this._location.back();
        this.store.dispatch(new UpdateBackText({ text: '', visible: false }));
    }

    public onSave(): void {
        const imageIdsLeft = this.artPieceForm.getRawValue().images.map(i => i.id);
        const imageIdsToRemove = this.artPiece.images.map(i => i.id).filter(id => !imageIdsLeft.includes(id));
        const newArtPiece = {
            ...this.artPiece,
            ...this.artPieceForm.getRawValue()
        };

        console.log('artPeiceForm: ', newArtPiece);
        this.store.dispatch(
            new UpdateArtPiece(
                {
                    artPiece: newArtPiece,
                    filesToAdd: this.filesToAdd.value,
                    imageIdsToRemove
                })
        );
    }

    public onRemoveImage(index: number): void {
        this.images.removeAt(index);
        this.artPieceForm.markAsDirty();
    }

    public onCancel(): void {
        // this.initializeArtPieceForm();
        this.hcUpload.clearFiles();
    }
    public onFileListChanged(files: Array<File>): void {
        this.filesToAdd.next(files);
    }

    private initializeArtPieceForm(): void {
        this.selectedArtPiece$
            .pipe(untilDestroyed(this))
            .subscribe(artPiece => {
                this.artPiece = artPiece;
                const imagesArray: FormArray = this.fb.array([]);
                if (artPiece) {
                    artPiece.images.forEach(({ id, name, size, created, updated, downloadUrl} ) => {
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
            
                    this.name.setValue(artPiece.name);
                    this.description.setValue(artPiece.description);
                    this.price.setValue(artPiece.price);
                    this.createdDate.setValue(artPiece.createdDate);
                    this.width.setValue(artPiece.width);
                    this.height.setValue(artPiece.height);
                    this.isSold.setValue(artPiece.isSold);
                    this.artPieceForm.setControl('images', imagesArray);
                    this.artPieceForm.markAsPristine();
                    this.artPieceForm.markAsUntouched();
                    this.artPieceForm.updateValueAndValidity();

                }
            });

    }

}

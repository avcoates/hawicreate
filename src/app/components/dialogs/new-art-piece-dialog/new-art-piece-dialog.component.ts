import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators } from '@angular/forms';
import { ArtPieceDto } from '@admin/shared/models';

@Component({
    selector: 'hc-new-art-piece-dialog',
    templateUrl: './new-art-piece-dialog.component.html',
    styleUrls: ['./new-art-piece-dialog.component.scss']
})
export class NewArtPieceDialogComponent  {

    public form = this.fb.group({
        name: ['', [Validators.required]],
        description: '',
        price: [, []],
        createdDate: [new Date(), [Validators.required]],
        width: [, [Validators.required, Validators.min(1)]],
        height: [, [Validators.required, Validators.min(1)]],
        isSold: [false, [Validators.required]],
        isFeatured: [false, [Validators.required]],
    });

    private files = new Array<File>();

    constructor(public dialogRef: MatDialogRef<NewArtPieceDialogComponent>,
                private fb: FormBuilder) { }

    public onAdd(): void {
        const { name,
                description,
                price,
                createdDate,
                width,
                height,
                isSold,
                isFeatured
        } = this.form.getRawValue();

        const artPieceDto: ArtPieceDto = {
            imageIds: [],
            name,
            description,
            price,
            createdDate,
            width,
            height,
            isSold,
            isFeatured,
            files: this.files
        };

        this.dialogRef.close(artPieceDto);
    }

    public onCancel(): void {
        this.dialogRef.close();
    }

    public onFileListChanged(files: Array<File>): void {
        this.files = files;
    }


}

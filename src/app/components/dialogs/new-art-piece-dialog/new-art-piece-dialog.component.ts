import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'hc-new-art-piece-dialog',
    templateUrl: './new-art-piece-dialog.component.html',
    styleUrls: ['./new-art-piece-dialog.component.scss']
})
export class NewArtPieceDialogComponent  {

    constructor(public dialogRef: MatDialogRef<NewArtPieceDialogComponent>) { }

    public onAdd(): void {
        this.dialogRef.close('Affirm');
    }

    public onCancel(): void {
        this.dialogRef.close('Dismiss');
    }


}

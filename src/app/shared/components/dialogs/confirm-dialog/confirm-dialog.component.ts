import { Component, OnInit, Inject } from '@angular/core';
import { ConfirmDialogData } from '../dialog-models';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent {

    constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData) { }

    public onConfirm(): void {
        this.dialogRef.close('Affirm');
    }

    public onCancel(): void {
        this.dialogRef.close('Dismiss');
    }

}

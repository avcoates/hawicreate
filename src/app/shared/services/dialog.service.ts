import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfirmDialogData, ConfirmResult } from '../components/dialogs/dialog-models';
import { ConfirmDialogComponent } from '../components/dialogs';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DialogService {

    constructor(public dialog: MatDialog) { }

    public openConfirmDialog(data: ConfirmDialogData): Observable<ConfirmResult> {
        const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDialogData, ConfirmResult>(ConfirmDialogComponent, {
            width: '250px',
            data
        });

        return dialogRef.afterClosed();
    }
}

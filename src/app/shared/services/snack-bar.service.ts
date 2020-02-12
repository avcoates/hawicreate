import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
    providedIn: 'root'
})
export class SnackBarService {

    public readonly millisecondDuration: 5000;
    constructor(private _snackBar: MatSnackBar) { }

    public openSnackBar(message: string) {
        this._snackBar.open(message, '', { duration: 5000});
    }
}

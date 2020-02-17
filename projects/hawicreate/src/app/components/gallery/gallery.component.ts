import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtPiece } from '@admin/shared/models';
import { ArtPieceApiService } from '@admin/shared/services/data';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

    public artPieces$: Observable<Array<ArtPiece>>;

    constructor(private artPieceApiService: ArtPieceApiService,
                private router: Router) { }

    public ngOnInit() {
        this.artPieces$ = this.artPieceApiService.getAll();
    }

    public onNavigateTo(artPiece: ArtPiece): void {
        this.router.navigate(['art-piece', artPiece.id]);
    }
}

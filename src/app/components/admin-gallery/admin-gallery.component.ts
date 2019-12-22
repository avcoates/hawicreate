import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesState } from '@admin/state/images.state';
import { ArtPieceDTO, ArtPiece, Upload } from '@admin/shared/models';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';
import { ImagesStorageApiService } from '@admin/services/images-storage-api.service';

@Component({
    selector: 'hc-admin-gallery',
    templateUrl: './admin-gallery.component.html',
    styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {

    @Select(ImagesState.allImages)
    public allImages$!: Observable<Array<string>>;

    public artPieces$: Observable<Array<ArtPiece>>;

    constructor(private artPieceDatabaseApiService: ArtPieceDatabaseApiService,
                private imageStorageApiService: ImagesStorageApiService) { }

    public ngOnInit(): void {
        this.artPieces$ = this.artPieceDatabaseApiService.getAll();
    }

    public onAddArtPiece(): void {
        const a: ArtPieceDTO = {
            name: 'test',
            description: 'from the client',
            createdDate: new Date(),
            price: 69,
            images: [''],
            size: ''
        };

        this.artPieceDatabaseApiService.add(a).subscribe(console.log);
    }

    public onDelete(artPiece: ArtPiece): void {
        this.artPieceDatabaseApiService.delete(artPiece);
    }

    public fileChange(event: any): void {
        const fileList: FileList = event.target.files;
        if (fileList.length > 0) {
            const file: File = fileList[0];
            this.imageStorageApiService.addImage(file);
        }
    }

}


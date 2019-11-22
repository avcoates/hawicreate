import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesState } from '@admin/state/images.state';
import { ArtPieceDTO, ArtPiece } from '@admin/shared/models';
import { ArtPieceDatabaseApiService } from '@admin/services/art-piece-database-api.service';

@Component({
  selector: 'hawicreate-admin-gallery',
  templateUrl: './admin-gallery.component.html',
  styleUrls: ['./admin-gallery.component.scss']
})
export class AdminGalleryComponent implements OnInit {

  @Select(ImagesState.allImages)
  public allImages$!: Observable<Array<string>>;

  public artPieces$: Observable<Array<ArtPiece>>;

  constructor(private artPieceDatabaseApiService: ArtPieceDatabaseApiService) { }

  ngOnInit() {
    this.artPieces$ = this.artPieceDatabaseApiService.getAll();
  }

  public onAddArtPiece(): void {
    const a: ArtPieceDTO = {
      name: 'test',
      description: 'from the client',
      createdDate: new Date(),
      price: 69,
      image: ''
    };

    this.artPieceDatabaseApiService.add(a).subscribe(console.log);
  }

  public onDelete(artPiece: ArtPiece): void {
    this.artPieceDatabaseApiService.delete(artPiece);
  }

}


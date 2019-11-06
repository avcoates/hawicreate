import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ImagesState } from '@app/state/images.state';
import { ArtPieceDTO, ArtPiece } from '@app/shared/models';
import { ArtPieceDatabaseApiService } from '@app/services/art-piece-database-api.service';

@Component({
  selector: 'hawicreate-app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

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

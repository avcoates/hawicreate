import { Component, OnInit } from '@angular/core';
import { ArtPieceApiService } from '@admin/shared/services/data';
import { Observable } from 'rxjs';
import { ArtPiece } from '@admin/shared/models';
import { map, tap } from 'rxjs/operators';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public featuredArtPieces$!: Observable<Array<ArtPiece>>;

    public state$: Observable<{ images: Array<NgxGalleryImage>, options: NgxGalleryOptions }>;
    constructor(private artPieceApiService: ArtPieceApiService) { }

    public ngOnInit(): void {
        this.featuredArtPieces$ = this.artPieceApiService.getAllFeatured();

        this.state$ = this.artPieceApiService.getAllFeatured()
            .pipe(
                map(artPieces => {
                    const options: NgxGalleryOptions[] = [{
                            imageSize: 'contain',
                            preview: false,
                            imageAutoPlay: true,
                            imageBullets: true,
                            imageArrows: artPieces.length > 1,
                            arrowPrevIcon: 'fa fa-angle-left',
                            arrowNextIcon: 'fa fa-angle-right',
                            closeIcon: 'fa fa-times',
                            imageSwipe: true,
                            imageInfinityMove: true,
                            thumbnailSize: 'contain',
                            thumbnails: false,
                            imageAutoPlayInterval: 5000
                    }];
                    return {
                        images: artPieces
                            .map(p => p.images[0])
                            .map(i => {
                                const im: NgxGalleryImage = {
                                    small: i.downloadUrl,
                                    medium: i.downloadUrl,
                                    big: i.downloadUrl,
                                    url: i.downloadUrl,
                                };
                                return im;
                        }),
                        options
                    };
                }),
                tap(console.log)
            );
    }

}

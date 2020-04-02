import { Component, OnInit } from '@angular/core';
import { ArtPieceApiService, PageApiService } from '@admin/shared/services/data';
import { Observable } from 'rxjs';
import { ArtPiece, HomePage } from '@admin/shared/models';
import { map, tap } from 'rxjs/operators';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public featuredArtPieces$!: Observable<Array<ArtPiece>>;
    public homePage$!: Observable<HomePage>;
    public state$: Observable<{ images: Array<NgxGalleryImage>, options: NgxGalleryOptions[] }>;

    constructor(private artPieceApiService: ArtPieceApiService,
                private pageApiService: PageApiService,
                private router: Router) { }

    public ngOnInit(): void {
        this.featuredArtPieces$ = this.artPieceApiService.getAllFeatured();
        this.homePage$ = this.pageApiService.getHomePage();

        this.state$ = this.artPieceApiService.getAllFeatured()
            .pipe(
                map(artPieces => {
                    const options: NgxGalleryOptions[] = [{
                            imageSize: 'contain',
                            preview: true,
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
                            imageAutoPlayInterval: 5000,
                            actions: [ {
                                icon: 'fa fa-eye',
                                disabled: false,
                                titleText: 'View',
                                onClick: ($event: any, index: number) => {
                                    this.router.navigate(['art-piece', artPieces[index].id]);
                                }
                            }]
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
                })
            );
    }

}

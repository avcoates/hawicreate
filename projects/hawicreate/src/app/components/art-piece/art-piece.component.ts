import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Route, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ArtPiece } from '@admin/shared/models';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ArtPieceApiService } from '@admin/shared/services/data';
import { NgxGalleryImage, NgxGalleryOptions } from 'ngx-gallery';
import { tap, combineLatest, map } from 'rxjs/operators';

@Component({
    selector: 'app-art-piece',
    templateUrl: './art-piece.component.html',
    styleUrls: ['./art-piece.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArtPieceComponent implements OnInit, OnDestroy {

    public state$: Observable<{ options: Array<NgxGalleryOptions>, images: Array<NgxGalleryImage>, artPiece: ArtPiece }>;

    constructor(private route: ActivatedRoute,
                private artPieceApiService: ArtPieceApiService) { }

    public ngOnInit() {
        this.route.paramMap
            .pipe(untilDestroyed(this))
            .subscribe( paramMap => {
                this.state$ = this.artPieceApiService.getById(paramMap.get('id'))
                    .pipe(
                        map(artPiece => {
                            return {
                                images: artPiece.images.map(i => {
                                    return { small: i.downloadUrl,
                                            medium: i.downloadUrl,
                                            big: i.downloadUrl,
                                            url: i.downloadUrl,
                                            label: artPiece.name,
                                            description: artPiece.description
                                        };
                                }),
                                artPiece,
                                options: [
                                        {
                                            imageSize: 'contain',
                                            preview: true,
                                            imageArrows: artPiece.images.length > 1,
                                            previewAnimation: false,
                                            arrowPrevIcon: 'fa fa-angle-left',
                                            arrowNextIcon: 'fa fa-angle-right',
                                            closeIcon: 'fa fa-times',
                                            imageSwipe: true,
                                            previewCloseOnClick: true,
                                            previewCloseOnEsc: true,
                                            previewKeyboardNavigation: true,
                                            previewSwipe: true,
                                            previewZoom: true,
                                            imageInfinityMove: true,
                                            previewInfinityMove: true,
                                            thumbnailSize: 'contain',
                                            thumbnails: artPiece.images.length > 1
                                        }
                            ]
                            };
                        })
                    );
            });
    }

    public ngOnDestroy(): void {
        // Nedded for untilDestroyed();
    }


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ArtPieceDatabaseApiService } from '@app/services/art-piece-database-api.service';
import { ImagesState } from '@app/state/images.state';
import { ArtPiece, ArtPieceDTO } from '@app/shared/models';

@Component({
    selector: 'hawicreate-app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

    @Select(ImagesState.featuredImages)
    public featuredImages$!: Observable<Array<string>>;

    /*
        TODO: For the sake of simplicity and getting a working feature,
        only the last image in featured images will be used until I implement
        a sildeshow component to fade new images in
    */
    public get imageIndex$(): Observable<number> {
        return this.featuredImages$.pipe(
                                        map(images => images.length ? images.length - 1 : null)
                                    );
    }
    
    constructor(private store: Store,
                private artPieceDatabaseApiService: ArtPieceDatabaseApiService) {
        // this.store.dispatch(new GetFeaturedPhotos());
    }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {
    }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ImagesState } from 'src/app/state/images.state';
import { Observable } from 'rxjs';
import { GetFeaturedPhotos } from 'src/app/actions/images.actions';
import { map } from 'rxjs/operators';

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
    constructor(private store: Store) {
        // this.store.dispatch(new GetFeaturedPhotos());
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {
    }

}

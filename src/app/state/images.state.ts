
import { GetAllPhotos, GetFeaturedPhotos } from '../actions/images.actions';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImagesStateModel } from './images.state';
import { ImagesApiService } from '../services/images-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ImagesStateModel {
    allImages: Array<string>;
    featuredImages: Array<string>;
}

@State<ImagesStateModel>({
    name: 'images',
    defaults: {
        allImages: [],
        featuredImages: []
    }
})
export class ImagesState {
    @Selector()
    public static allImages(state: ImagesStateModel): Array<string> {
        return state.allImages;
    }

    @Selector()
    public static featuredImages({ featuredImages }: ImagesStateModel): Array<string> {
        return featuredImages;
    }
    constructor(private imageApiService: ImagesApiService) {}

    @Action(GetAllPhotos)
    public GetAllPhotos({ patchState }: StateContext<ImagesStateModel>): Observable<Array<string>> {
        return this.imageApiService.GetAllPhotos().pipe(
            tap(imageUrls => {
                patchState({
                    allImages: imageUrls
                });
            })
        );
    }

    @Action(GetFeaturedPhotos)
    public getFeaturedPhotos({ patchState }: StateContext<ImagesStateModel>): Observable<Array<string>> {
        return this.imageApiService.GetFeaturedImages().pipe(
            tap(featuredImages => {
                patchState({
                    featuredImages
                });
            })
        );
    }
}




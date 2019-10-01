
import { GetAllPhotos } from '../actions/images.actions';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { ImagesStateModel } from './images.state';
import { ImagesApiService } from '../services/images-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface ImagesStateModel {
    allImages: Array<string>;
}

@State<ImagesStateModel>({
    name: 'images',
    defaults: {
        allImages: []
    }
})
export class ImagesState {
    @Selector()
    public static allImages(state: ImagesStateModel): Array<string> {
        return state.allImages;
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
}




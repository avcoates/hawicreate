
import { State, Selector } from '@ngxs/store';
import { ImagesStateModel } from './images.state';
import { ImageApiService } from '@admin/services';

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
    constructor(private imageApiService: ImageApiService) {}

}




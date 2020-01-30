import { State, Selector } from '@ngxs/store';
import { Collection } from '@admin/shared/models';

export interface GalleryStateModel {
    collections: Array<Collection>;
    selectedCollection: Collection;
}

@State<GalleryStateModel>({
    name: 'gallery',
    defaults: {
        collections: [],
        selectedCollection: null
    }
})
export class GalleryState {
    @Selector()
    public static collections(state: GalleryStateModel): Array<Collection> {
        return state.collections;
    }

    @Selector()
    public static selectedCollection(state: GalleryStateModel): Collection {
        return state.selectedCollection;
    }

    constructor() {}

}

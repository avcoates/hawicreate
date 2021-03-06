import { State, Selector, Action, StateContext } from '@ngxs/store';
import { Collection } from '@admin/shared/models';
import { CollectionApiService } from '@admin/shared/services/data/collection-api.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GetAllCollections } from '../actions/gallery.actions';
import { Injectable } from '@angular/core';

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

@Injectable()
export class GalleryState {
    @Selector()
    public static collections(state: GalleryStateModel): Array<Collection> {
        return state.collections;
    }

    @Selector()
    public static selectedCollection(state: GalleryStateModel): Collection {
        return state.selectedCollection;
    }

    constructor(private collectionApiService: CollectionApiService) {}

    @Action(GetAllCollections)
    public getAllCollections({ patchState }: StateContext<GalleryStateModel>): Observable<Array<Collection>> {
        return this.collectionApiService.getAllCollcetions()
            .pipe(tap(collections => setTimeout(() => patchState({ collections }))));
    }

}

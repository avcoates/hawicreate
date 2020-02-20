import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetAllContactRequests, DeleteContactRequest, ArchiveContactRequest, RecoverContactRequest } from '@admin/actions/app.actions';
import { AppState } from '@admin/state';
import { Observable, combineLatest } from 'rxjs';
import { ContactRequest } from '@admin/shared/models';
import { DialogService } from '@admin/shared/services';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'hc-admin-contact-request',
    templateUrl: './admin-contact-request.component.html',
    styleUrls: ['./admin-contact-request.component.scss']
})
export class AdminContactRequestComponent implements OnInit {

    @Select(AppState.contactRequests)
    public contactRequests$!: Observable<Array<ContactRequest>>;

    @Select(AppState.archivedContactRequests)
    public archivedContactRequests$!: Observable<Array<ContactRequest>>;

    public state$: Observable<{activeRequests: Array<ContactRequest>, archivedRequests: Array<ContactRequest>}>;

    constructor(private store: Store,
                private dialogService: DialogService) { }

    public ngOnInit(): void {
        this.store.dispatch(new GetAllContactRequests());
        this.state$ = combineLatest([this.contactRequests$, this.archivedContactRequests$])
            .pipe(map(([activeRequests, archivedRequests]) => ({ activeRequests, archivedRequests})));
    }

    public delete(contactRequest: ContactRequest): void {
        this.dialogService.openConfirmDialog({
            confirmText: `Delete request from ${contactRequest.name}?\n There is no way to undo this`,
            affirmButton: 'Delete'
        })
        .pipe(filter(resut => resut === 'Affirm'))
        .subscribe(() => this.store.dispatch(new DeleteContactRequest(contactRequest)));
    }

    public archive(contactRequest: ContactRequest): void {
        this.store.dispatch(new ArchiveContactRequest(contactRequest));
    }

    public recover(contactRequest: ContactRequest): void {
        this.store.dispatch(new RecoverContactRequest(contactRequest));
    }

}
export interface ConfirmDialogData {
    confirmText: string;
    affirmButton: string;
}
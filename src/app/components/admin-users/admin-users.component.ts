import { Component, OnInit } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetAllUsers } from '@admin/actions/app.actions';
import { AppState } from '@admin/state/app.state';
import { Observable } from 'rxjs';
import { User } from '@admin/shared/models/user';
import { FormBuilder } from '@angular/forms';
import { UserApiService } from '@admin/services';

@Component({
    selector: 'hc-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    @Select(AppState.users)
    public users$!: Observable<Array<User>>;

    public form = this.fb.group({
        uid: '',
    });

    constructor(private store: Store,
                private fb: FormBuilder,
                private userApiService: UserApiService,
                ) { }

    public ngOnInit(): void {
        this.store.dispatch(new GetAllUsers());
    }

    public getUser(): void {
        this.userApiService.getUserByUid(this.form.get('uid').value)
            .subscribe(console.log);
    }

}

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserApiService } from '@admin/services';
import { Observable } from 'rxjs';
import { User } from '@admin/shared/models/user';
import { Location } from '@angular/common';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { UpdateUser } from '@admin/actions/app.actions';

@Component({
    selector: 'hc-admin-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

    public userForm$: Observable<FormGroup>;
    public userId: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userApiService: UserApiService,
                private _location: Location,
                private store: Store) { }

    public ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
        this.setUserForm();
    }

    public onBack(): void {
        this._location.back();
    }

    public onCancel(): void {
        this.setUserForm();
    }

    public onSave(form: FormGroup): void {
        const user: User = form.getRawValue();
        if (user.isAdmin) {
            user.isRequestingAdmin = false;
        }
        this.store.dispatch(new UpdateUser(user))
            .subscribe(() => this.setUserForm());
    }

    private setUserForm(): void {
        this.userForm$ = this.userApiService.getUserByUid(this.userId)
            .pipe(map(toUserForm));
    }
}

const toUserForm = (user: User): FormGroup => {
    const fb = new FormBuilder();
    return fb.group({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        isAdmin: user.isAdmin,
        isRequestingAdmin: user.isRequestingAdmin,
    });
};

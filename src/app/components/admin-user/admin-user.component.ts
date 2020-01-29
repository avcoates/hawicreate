import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserApiService } from '@admin/services';
import { Observable } from 'rxjs';
import { User } from '@admin/shared/models/user';
import { Location } from '@angular/common';

@Component({
    selector: 'hc-admin-user',
    templateUrl: './admin-user.component.html',
    styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

    public user$: Observable<User>;
    public userId: string;

    constructor(private router: Router,
                private route: ActivatedRoute,
                private userApiService: UserApiService,
                private _location: Location) { }

    public ngOnInit(): void {
        this.userId = this.route.snapshot.paramMap.get('id');
        this.user$ = this.userApiService.getUserByUid(this.userId);
    }

    public onBack(): void {
        this._location.back();
    }

}

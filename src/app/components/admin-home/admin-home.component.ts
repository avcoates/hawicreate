import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { User } from '@admin/shared/models/user';
import { AppState } from '@admin/state/app.state';
import { HomePage } from '@admin/shared/models';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { FormBuilder, AbstractControl, FormGroup } from '@angular/forms';
import { GetHomePageData, UpdateHomePageData } from '@admin/actions/app.actions';

@Component({
    selector: 'hc-home',
    templateUrl: './admin-home.component.html',
    styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit, OnDestroy {

    @Select(AppState.activeUser)
    public user$!: Observable<User>;

    @Select(AppState.homePage)
    public homePage$!: Observable<HomePage>;

    public state$!: Observable<{ user: User, form: FormGroup}>;

    public form = this.fb.group({
        quote: '',
        author: '',
        aboutMe: ''
    });

    public get quote(): AbstractControl {
        return this.form.get('quote');
    }

    public get author(): AbstractControl {
        return this.form.get('author');
    }

    public get aboutMe(): AbstractControl {
        return this.form.get('aboutMe');
    }

    constructor(private store: Store,
                private fb: FormBuilder) {
    }

    public ngOnInit(): void {
        this.getForm();
        this.state$ = combineLatest([this.user$, this.homePage$])
            .pipe(
                map(([user, homePage]) => ({ user, form: this.updateForm(homePage) }))
            );
    }

    public ngOnDestroy(): void {
    }

    public onUpdateHomePage(form: FormGroup): void {
        this.store.dispatch(new UpdateHomePageData(form.getRawValue()));
    }

    public onCancel(): void {
        this.getForm();
    }

    private updateForm(homePage: HomePage): FormGroup {
        return this.fb.group({
            quote: homePage.quote,
            author: homePage.author,
            aboutMe: homePage.aboutMe
        });
    }

    private getForm(): void {
        this.store.dispatch(new GetHomePageData());

    }
}

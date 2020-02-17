import { Injectable } from '@angular/core';
import { ContactApiService } from '@admin/shared/services/data';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { Observable, of } from 'rxjs';
import { ContactDto } from '@admin/shared/models';
import { switchMap, map } from 'rxjs/operators';
import { RecaptchaService } from './recaptcha.service';

@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private recaptchaService: RecaptchaService,
                private contactApiService: ContactApiService,
                private recaptchaV3Service: ReCaptchaV3Service) { }

    public add(contact: ContactDto): Observable<boolean> {
        return this.getRecaptchaResponse('contact')
            .pipe(
                switchMap(response => this.recaptchaService.verifyReCaptcha(response)),
                switchMap(response => {
                    if (!response.success) {
                        return of(false);
                    }

                    return this.contactApiService.addContact(contact)
                        .pipe(
                            switchMap(doc => doc.get()),
                            map(snap => snap.exists)
                        );
                })
            );
    }

    private getRecaptchaResponse(action: string): Observable<string> {
        return this.recaptchaV3Service.execute(action);
    }
}

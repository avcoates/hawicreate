import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReCaptchaResponse } from '../app/models';
import { Observable, from, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class RecaptchaService {

    private readonly reCaptcha = 'https://us-central1-hawicreate.cloudfunctions.net/reCaptcha';
    constructor(private http: HttpClient) { }

    public verifyReCaptcha(response: string): Observable<ReCaptchaResponse> {
        return this.http.post<ReCaptchaResponse>(`${this.reCaptcha}?response=${response}`, null);
    }

}

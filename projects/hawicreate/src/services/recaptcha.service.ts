import { Injectable } from '@angular/core';
import { ReCaptchaResponse } from '../app/models';
import { Observable, from, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

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

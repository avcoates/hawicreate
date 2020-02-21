import { Component, OnInit } from '@angular/core';
import { ContactRequestApiService } from '@admin/shared/services/data';

@Component({
    selector: 'hc-admin-contact-request',
    templateUrl: './admin-request-contact.component.html',
    styleUrls: ['./admin-request-contact.component.scss']
})
export class AdminContactRequestComponent implements OnInit {

    constructor(private contactRequestApiService: ContactRequestApiService) { }

    ngOnInit() {
    }

}

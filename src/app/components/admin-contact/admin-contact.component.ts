import { Component, OnInit } from '@angular/core';
import { ContactApiService } from '@shared/services/data';

@Component({
    selector: 'hc-admin-contact',
    templateUrl: './admin-contact.component.html',
    styleUrls: ['./admin-contact.component.scss']
})
export class AdminContactComponent implements OnInit {

    constructor(private contactApiService: ContactApiService) { }

    ngOnInit() {
    }

}

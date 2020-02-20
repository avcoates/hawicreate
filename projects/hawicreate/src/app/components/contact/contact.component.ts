import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ContactService } from '../../../services';
import { SnackBarService } from '@admin/shared/services';
import { ContactRequestDto } from '@admin/shared/models';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit, OnDestroy {

    public form = this.fb.group({
        name: [null, []],
        email: [null, [Validators.email]],
        message: [null, []]
        },
        { validators: validAndDirty }
    );

    public get name(): AbstractControl {
        return this.form.get('name');
    }

    public get email(): AbstractControl {
        return this.form.get('email');
    }

    public get message(): AbstractControl {
        return this.form.get('message');
    }

    private singleExecutionSubscription: Subscription;

    constructor(private fb: FormBuilder,
                private contactService: ContactService,
                private snackBarService: SnackBarService) { }

    ngOnInit() {
    }

    public ngOnDestroy() {

        if (this.singleExecutionSubscription) {
          this.singleExecutionSubscription.unsubscribe();
        }
    }

    public onSend(): void {
        const contact: ContactRequestDto = {
            ...this.form.getRawValue(),
            archived: false
        };

        this.singleExecutionSubscription = this.contactService
            .add(contact)
            .subscribe(added => {
                if (added) {
                    this.snackBarService.openSnackBar('Message sent!');
                } else {
                    this.snackBarService.openSnackBar('Error: try again');
                }
                this.name.reset();
                this.email.reset();
                this.message.reset();
            });
    }

}

/**
 * Only checks form Valid.Required if one or more of the form controls is dirty
 * @param form to validate
 */
const validAndDirty = (form: FormGroup): ValidationErrors | null => {
    const name = form.get('name');
    const email = form.get('email');
    const message = form.get('message');

    if (!name.dirty && !email.dirty && !message.dirty) {
        return null;
    }

    const nameIsMissing = Validators.required(name);
    if (nameIsMissing) {
        return nameIsMissing;
    }
    const emailIsMssing = Validators.required(email);
    if (emailIsMssing) {
        return emailIsMssing;
    }
    const messageIsMissing = Validators.required(message);
    if (messageIsMissing) {
        return messageIsMissing;
    }


    return null;
};

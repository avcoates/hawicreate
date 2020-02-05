import { Component, Output, EventEmitter } from '@angular/core';

export interface FileUpload {
    url: string | ArrayBuffer;
    file: File;
}
@Component({
    selector: 'hc-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {

    @Output()
    public fileListChanges = new EventEmitter<Array<FileUpload>>();

    constructor() { }

    public files: Array<FileUpload> = [];

    public onFileChanged(event: any): void {
        if (event.target && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => { // called once readAsDataURL is completed
                this.files.push({ url: reader.result, file});
                this.fileListChanges.emit(this.files);
            };

        }
    }

}

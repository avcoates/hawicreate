import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'hc-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnInit {

    constructor() { }

    public url: string | ArrayBuffer;
    private files: Array<File> = [];
    private selectedFile: File;

    ngOnInit() {
    }

    public onFileChanged(event: any): void {
        if (event.target && event.target.files.length > 0) {
            this.selectedFile = event.target.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(this.selectedFile);

            reader.onload = () => { // called once readAsDataURL is completed
                this.url = reader.result;
            };
        }
    }

    public onSelectFile(): void {
        this.files.push(this.selectedFile);
        this.url = null;
        this.selectedFile = null;
    }

}

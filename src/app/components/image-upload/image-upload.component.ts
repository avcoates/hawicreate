import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Upload } from '@admin/shared/models';

export interface FileUpload {
    url: string | ArrayBuffer;
    file: File;
}
@Component({
    selector: 'hc-image-upload',
    templateUrl: './image-upload.component.html',
    styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent implements OnDestroy {

    @Output()
    public fileListChanged = new EventEmitter<Array<File>>();

    public uploads: Array<FileUpload> = [];

    constructor() {
    }

    public ngOnDestroy(): void {
        // For untilDestroyed()
    }

    public clearFiles(): void {
        this.uploads = [];
        this.emitChanges();
    }

    public onFileChanged(event: any): void {
        if (event.target && event.target.files.length > 0) {
            const file = event.target.files[0];

            const reader = new FileReader();

            reader.readAsDataURL(file);

            reader.onload = () => { // called once readAsDataURL is completed
                this.uploads.push({ url: reader.result, file});
                this.emitChanges();
            };

        }
    }

    public onRemoveUpload(upload: Upload): void {
        this.uploads = this.uploads.filter(u => u.url !== upload.url);
        this.emitChanges();
    }

    private emitChanges(): void {
        this.fileListChanged.emit(this.uploads.map(u => u.file));
    }

}

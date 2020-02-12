export interface Image {
    id: string;
    name: string;
    size: string;
    created: Date;
    updated: Date;
    downloadUrl: string;
}

export interface ImageDto {
    name: string;
    file: File;
}

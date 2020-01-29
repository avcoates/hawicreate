export class ArtPiece {
    public id: string;
    public name = '';
    public description = '';
    public price = -1;
    public createdDate = new Date();
    public images = [''];
    public size: string;
    public isSold: boolean;
}

export interface ArtPieceDTO {
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    images: Array<string>;
    size: string;
    isSold: boolean;
}

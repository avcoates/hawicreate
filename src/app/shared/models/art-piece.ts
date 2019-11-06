export class ArtPiece {
    public id: string;
    public name = '';
    public description = '';
    public price = -1;
    public createdDate = new Date();
    public image = '';
}

export interface ArtPieceDTO {
    name: string;
    description: string;
    price: number;
    createdDate: Date;
    image: string;
}

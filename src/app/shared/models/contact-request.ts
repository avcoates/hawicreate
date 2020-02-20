export interface ContactRequest {
    id: string;
    name: string;
    email: string;
    message: string;
    archived: boolean;
}

export interface ContactRequestDto {
    name: string;
    email: string;
    message: string;
    archived: boolean;
}

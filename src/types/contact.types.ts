export interface IContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export interface IContactResponse {
    success: boolean;
    message: string;
}
import { httpClient } from '../apiClient';
import { API_ENDPOINTS } from '../endpoints';
import { IContactFormData, IContactResponse } from '@/types/contact.types';

export interface IContactService {
    sendMessage(formData: IContactFormData): Promise<IContactResponse>;
}

export class ContactService implements IContactService {
    async sendMessage(formData: IContactFormData): Promise<IContactResponse> {
        return httpClient.post<IContactResponse>(API_ENDPOINTS.CONTACT, formData);
    }
}

export const contactService = new ContactService();
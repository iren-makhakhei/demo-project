import { ApiClient } from '../services/apiClient';
import { Contact } from '../types/apiTypes';

export class ContactApiPage {
  private apiClient: ApiClient;
  
  constructor(baseUrl: string) {
    this.apiClient = new ApiClient(baseUrl);
  }

  async login(email: string, password: string): Promise<string> {
    const response = await this.apiClient.post('/users/login', {
      email,
      password
    });
    
    const token = response.data.token;
    this.apiClient.setAuthToken(token);
    return token;
  }

  async getAllContacts(): Promise<Contact[]> {
    const response = await this.apiClient.get('/contacts');
    return response.data;
  }

  async getContactById(id: string): Promise<Contact> {
    const response = await this.apiClient.get(`/contacts/${id}`);
    return response.data;
  }

  async createContact(contact: Contact): Promise<Contact> {
    const response = await this.apiClient.post('/contacts', contact);
    return response.data;
  }

  async updateContact(id: string, contact: Partial<Contact>): Promise<Contact> {
    const response = await this.apiClient.put(`/contacts/${id}`, contact);
    return response.data;
  }

  async deleteContact(id: string): Promise<void> {
    await this.apiClient.delete(`/contacts/${id}`);
  }
}
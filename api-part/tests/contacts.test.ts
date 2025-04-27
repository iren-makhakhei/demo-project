import { ContactApiPage } from '../pages/contactApiPage';
import { config } from '../config';
import { generateRandomContact } from '../../ui-part/data/generateContact';

describe('Contact API Tests', () => {
  let contactApi: ContactApiPage;
  let authToken: string;

  beforeAll(async () => {
    // Initialize the API client
    contactApi = new ContactApiPage(config.apiBaseUrl);
    
    // Login to get auth token
    authToken = await contactApi.login(config.apiUser, config.apiPassword);
    expect(authToken).toBeTruthy();
  });

  it('should get all contacts', async () => {
    const contacts = await contactApi.getAllContacts();
    expect(Array.isArray(contacts)).toBe(true);
  });

  it('should create a new contact', async () => {
    // Generate random contact data
    const newContactData = generateRandomContact();
    
    // Create contact via API
    const createdContact = await contactApi.createContact(newContactData);
    
    // Verify created contact has expected data
    expect(createdContact).toHaveProperty('_id');
    expect(createdContact.firstName).toBe(newContactData.firstName);
    expect(createdContact.lastName).toBe(newContactData.lastName);
    expect(createdContact.email).toBe(newContactData.email);
    
    // Clean up - delete the created contact
    if (createdContact._id) {
      await contactApi.deleteContact(createdContact._id);
    }
  });

  it('should update an existing contact', async () => {
    // Create a contact to update
    const contactData = generateRandomContact();
    const createdContact = await contactApi.createContact(contactData);
    
    // Update the contact
    const updateData = {
      firstName: 'Updated',
      lastName: 'Contact'
    };
    
    const updatedContact = await contactApi.updateContact(createdContact._id, updateData);
    
    // Verify the update
    expect(updatedContact.firstName).toBe(updateData.firstName);
    expect(updatedContact.lastName).toBe(updateData.lastName);
    
    // Clean up
    await contactApi.deleteContact(createdContact._id);
  });

  it('should delete a contact', async () => {
    // Create a contact to delete
    const contactData = generateRandomContact();
    const createdContact = await contactApi.createContact(contactData);
    
    // Delete the contact
    await contactApi.deleteContact(createdContact._id);
    
    // Verify the contact is deleted (should throw 404)
    try {
      await contactApi.getContactById(createdContact._id);
      fail('Expected contact to be deleted');
    } catch (error: any) {
      expect(error.response.status).toBe(404);
    }
  });
});
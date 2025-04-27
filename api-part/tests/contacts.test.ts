import { ContactApiPage } from '../pages/contactApiPage';
import { config } from '../../config';
//import { generateRandomContact } from '../../ui-part/data/generateContact';

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

  it('should retrieve all contacts, delete them, and verify none remain', async () => {
    // Get initial contacts
    const contacts = await contactApi.getAllContacts();
    console.log(`Found ${contacts.length} contacts to delete`);
    expect(Array.isArray(contacts)).toBe(true);
    
    // Skip test if no contacts found
    if (contacts.length === 0) {
      console.log('No contacts to delete. Test skipped.');
      return;
    }
    
    // Delete all contacts one by one
    for (const contact of contacts) {
      try {
        await contactApi.deleteContact(contact._id);
        console.log(`Deleted contact: ${contact.firstName} ${contact.lastName}`);
      } catch (error: any) {
        console.error(`Failed to delete contact ${contact.firstName} ${contact.lastName}:`, error.message);
      }
    }
    
    // Verify no contacts remain
    const remainingContacts = await contactApi.getAllContacts();
    expect(remainingContacts.length).toBe(0);
    console.log('Successfully deleted all contacts');
  });
});
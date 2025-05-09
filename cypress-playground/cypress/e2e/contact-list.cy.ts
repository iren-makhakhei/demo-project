import { generateRandomContact } from '@ui-part/data/generateContact';
import * as path from 'path';

describe('Contact List app tests', () => {
  beforeEach(() => {
    // Login before each test using environment variables
    cy.login(Cypress.env('UIUSER'), Cypress.env('UIPWD'));
  });

  it('User can populate contact list with random valid data from file', () => {
    const filePath = path.resolve(__dirname, '../../../ui-part/data/users.json');
    
    // Add contacts from file
    cy.addContactFromFile(filePath);
    
    // Validate that all contacts from the file exist in the list
    cy.validateContactsFromFile(filePath).should('eq', true);
  });

  it('User can populate contact list with random valid data from generator', () => {
    const randomContact = generateRandomContact();

    cy.addContactRandomData(randomContact);

    cy.validateContactPresence(randomContact).should('eq', true);
  });
});
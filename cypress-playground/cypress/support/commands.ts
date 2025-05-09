import { Contact } from '@ui-part/data/generateContact';
import * as path from 'path';

// Login command
Cypress.Commands.add('login', (email: string, password: string) => {
  cy.visit('/');
  cy.get('#email').type(email);
  cy.get('#password').type(password);
  cy.get('#submit').click();
  cy.get('#logout').should('exist'); // Verify successful login
});

// Add contact from file command
Cypress.Commands.add('addContactFromFile', (filePath: string) => {
  // Read the file directly from ui-part
  const fullPath = path.resolve(Cypress.config('projectRoot'), '../ui-part/data/users.json');
  cy.readFile(fullPath).then((users) => {
    for (const user of users) {
      cy.get('#add-contact').click();
      cy.get('#firstName').type(user.firstName);
      cy.get('#lastName').type(user.lastName);
      cy.get('#birthdate').type(user.birthdate);
      cy.get('#email').type(user.email);
      cy.get('#phone').type(user.phone);
      cy.get('#street1').type(user.street1);
      cy.get('#street2').type(user.street2);
      cy.get('#city').type(user.city);
      cy.get('#stateProvince').type(user.state);
      cy.get('#postalCode').type(user.postalCode);
      cy.get('#country').type(user.country);
      cy.get('#submit').click();
      cy.get('.contactTableHead').should('exist'); // Verify we're still on the contacts page
    }
  });
});

// Add contact with random data command
Cypress.Commands.add('addContactRandomData', (contact: Contact) => {
  cy.get('#add-contact').click();
  cy.get('#firstName').type(contact.firstName);
  cy.get('#lastName').type(contact.lastName);
  cy.get('#birthdate').type(contact.birthdate);
  cy.get('#email').type(contact.email);
  cy.get('#phone').type(contact.phone);
  cy.get('#street1').type(contact.street1);
  cy.get('#street2').type(contact.street2);
  cy.get('#city').type(contact.city);
  cy.get('#stateProvince').type(contact.state);
  cy.get('#postalCode').type(contact.postalCode);
  cy.get('#country').type(contact.country);
  cy.get('#submit').click();
});

// Validate contact presence command
Cypress.Commands.add('validateContactPresence', (contact: Contact) => {
  let found = false;
  
  return cy.get('.contactTableBodyRow').then($rows => {
    for (let i = 0; i < $rows.length; i++) {
      const $row = $rows.eq(i);
      
      // Get the values from the table cells
      const fullName = `${contact.firstName} ${contact.lastName}`;
      const fullAddress = `${contact.street1} ${contact.street2}`.trim();
      const cityStatePostal = `${contact.city} ${contact.state} ${contact.postalCode}`.trim();
      
      // Check if this row matches our contact
      const nameText = $row.find('td').eq(1).text();
      const birthdateText = $row.find('td').eq(2).text();
      const emailText = $row.find('td').eq(3).text();
      const phoneText = $row.find('td').eq(4).text();
      const addressText = $row.find('td').eq(5).text();
      const cityStateText = $row.find('td').eq(6).text();
      const countryText = $row.find('td').eq(7).text();
      
      // If all values match, we found our contact
      if (nameText === fullName && 
          birthdateText === contact.birthdate &&
          emailText === contact.email &&
          phoneText === contact.phone &&
          addressText === fullAddress &&
          cityStateText === cityStatePostal &&
          countryText === contact.country) {
        found = true;
        break;
      }
    }
    
    return cy.wrap(found);
  });
});

// Validate contacts from file command
Cypress.Commands.add('validateContactsFromFile', (filePath: string) => {
  const fullPath = path.resolve(Cypress.config('projectRoot'), '../ui-part/data/users.json');
  return cy.readFile(fullPath).then((users) => {
    // Start with assumption all contacts are found
    let allFound = true;
    
    // Create an array of promises to check each contact
    const promises = users.map((user: Contact) => {
      return cy.validateContactPresence(user).then(found => {
        if (!found) {
          cy.log(`Contact ${user.firstName} ${user.lastName} was not found in the list`);
          allFound = false;
        }
      });
    });
    
    // After all checks complete, return the final result
    return cy.wrap(Cypress.Promise.all(promises)).then(() => {
      return cy.wrap(allFound);
    });
  });
});
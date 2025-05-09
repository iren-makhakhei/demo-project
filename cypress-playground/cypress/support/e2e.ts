// Import commands.js using ES2015 syntax:
import './commands';

// Cypress custom commands type definition
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      addContactFromFile(filePath: string): Chainable<void>;
      addContactRandomData(contact: any): Chainable<void>;
      validateContactPresence(contact: any): Chainable<boolean>;
      validateContactsFromFile(filePath: string): Chainable<boolean>;
    }
  }
}
import { Selector, t } from 'testcafe';
import * as fs from 'fs';
import * as path from 'path';

export class ContactsPage {
    // Selectors
    contactListSelector: Selector;
    addContactButtonSelector: Selector;
    firstNameInputSelector: Selector;
    lastNameInputSelector: Selector;
    birthdateInputSelector: Selector;
    emailInputSelector: Selector;
    phoneInputSelector: Selector;
    streetAddress1InputSelector: Selector;
    streetAddress2InputSelector: Selector;
    cityInputSelector: Selector;
    stateInputSelector: Selector;
    postalCodeInputSelector: Selector;
    countryInputSelector: Selector;
    saveButtonSelector: Selector;
    logoutButtonSelector: Selector;

    constructor() {
        this.contactListSelector = Selector('.contactTableBodyRow'); 
        this.addContactButtonSelector = Selector('#add-contact'); 
        this.firstNameInputSelector = Selector('#firstName');
        this.lastNameInputSelector = Selector('#lastName');
        this.birthdateInputSelector = Selector('#birthdate');
        this.emailInputSelector = Selector('#email');
        this.phoneInputSelector = Selector('#phone');
        this.streetAddress1InputSelector = Selector('#street1');
        this.streetAddress2InputSelector = Selector('#street2');
        this.cityInputSelector = Selector('#city');
        this.stateInputSelector = Selector('#stateProvince');
        this.postalCodeInputSelector = Selector('#postalCode');
        this.countryInputSelector = Selector('#country');
        this.saveButtonSelector = Selector('#submit');
        this.logoutButtonSelector = Selector('#logout');
    }

    async addContactFromFile(pathAddress: string): Promise<void> {
        // Read the users.json file
        const filePath = path.resolve(__dirname, pathAddress);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const users = JSON.parse(fileContent);

        // Iterate through each user and add them as a contact
        for (const user of users) {
            await t
                .click(this.addContactButtonSelector)
                .typeText(this.firstNameInputSelector, user.firstName, { replace: true, paste: true })
                .typeText(this.lastNameInputSelector, user.lastName, { replace: true, paste: true })
                .typeText(this.birthdateInputSelector, user.birthdate, { replace: true, paste: true })
                .typeText(this.emailInputSelector, user.email, { replace: true, paste: true })
                .typeText(this.phoneInputSelector, user.phone, { replace: true, paste: true })
                .typeText(this.streetAddress1InputSelector, user.street1, { replace: true, paste: true })
                .typeText(this.streetAddress2InputSelector, user.street2, { replace: true, paste: true })
                .typeText(this.cityInputSelector, user.city, { replace: true, paste: true })
                .typeText(this.stateInputSelector, user.state, { replace: true, paste: true })
                .typeText(this.postalCodeInputSelector, user.postalCode, { replace: true, paste: true })
                .typeText(this.countryInputSelector, user.country, { replace: true, paste: true })
                .click(this.saveButtonSelector);
        }
    }

    async addContactRandomData(randomContact: any): Promise<void> {
        await t
            .click(this.addContactButtonSelector)
            .typeText(this.firstNameInputSelector, randomContact.firstName)
            .typeText(this.lastNameInputSelector, randomContact.lastName)
            .typeText(this.birthdateInputSelector, randomContact.birthdate)
            .typeText(this.emailInputSelector, randomContact.email)
            .typeText(this.phoneInputSelector, randomContact.phone)
            .typeText(this.streetAddress1InputSelector, randomContact.street1)
            .typeText(this.streetAddress2InputSelector, randomContact.street2)
            .typeText(this.cityInputSelector, randomContact.city)
            .typeText(this.stateInputSelector, randomContact.state)
            .typeText(this.postalCodeInputSelector, randomContact.postalCode)
            .typeText(this.countryInputSelector, randomContact.country)
            .click(this.saveButtonSelector);
    }

    async validateContactPresence(contact: any): Promise<boolean> {

        const rowCount = await this.contactListSelector.count;
        
        for (let i = 0; i < rowCount; i++) {
            const currentRow = this.contactListSelector.nth(i);
            
            // Get the values from the table cells
            const nameCell = await currentRow.find('td').nth(1).innerText;
            const birthdateCell = await currentRow.find('td').nth(2).innerText;
            const emailCell = await currentRow.find('td').nth(3).innerText;
            const phoneCell = await currentRow.find('td').nth(4).innerText;
            const addressCell = await currentRow.find('td').nth(5).innerText;
            const cityStatePostalCell = await currentRow.find('td').nth(6).innerText;
            const countryCell = await currentRow.find('td').nth(7).innerText;
            
            // Combine first and last name to match the table format
            const fullName = `${contact.firstName} ${contact.lastName}`;
            
            // Combine address parts to match the table format
            const fullAddress = `${contact.street1} ${contact.street2}`.trim();
            const cityStatePostal = `${contact.city} ${contact.state} ${contact.postalCode}`.trim();
            
            // Check if all fields match
            if (
                nameCell === fullName &&
                birthdateCell === contact.birthdate &&
                emailCell === contact.email &&
                phoneCell === contact.phone &&
                addressCell === fullAddress &&
                cityStatePostalCell === cityStatePostal &&
                countryCell === contact.country
            ) {
                return true; // Contact found and validated
            }
        }
        
        return false; // Contact not found

    }

    async validateContactsFromFile(pathAddress: string): Promise<boolean> {
        try {
            // Read the users.json file
            const filePath = path.resolve(__dirname, pathAddress);
            const fileContent = fs.readFileSync(filePath, 'utf-8');
            const users = JSON.parse(fileContent);
            
            // Verify each contact from the file exists in the contact list
            for (const expectedContact of users) {
                const contactExists = await this.validateContactPresence(expectedContact);
                if (!contactExists) {
                    console.log(`Contact ${expectedContact.firstName} ${expectedContact.lastName} was not found in the list`);
                    return false;
                }
            }
            
            // All contacts were found
            return true;
        } catch (error) {
            console.error('Error validating contacts from file:', error);
            return false;
        }
    }

     logoutButtonExists(): Promise<boolean> {
        return this.logoutButtonSelector.exists;
    }
}
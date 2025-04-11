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
        this.contactListSelector = Selector('.contact-list'); // Replace with actual selector
        this.addContactButtonSelector = Selector('#add-contact'); // Replace with actual selector
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

     logoutButtonExists(): Promise<boolean> {
        return this.logoutButtonSelector.exists;
    }
}
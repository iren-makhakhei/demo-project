import { Selector, t } from 'testcafe';

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
        this.addContactButtonSelector = Selector('.add-contact-button'); // Replace with actual selector
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

    async addContact(firstName: string, lastName: string, email: string, street1: string, street2: string): Promise<void> {
        await t
            .click(this.addContactButtonSelector)
            .typeText(this.firstNameInputSelector, firstName)
            .typeText(this.lastNameInputSelector, lastName)
            .typeText(this.birthdateInputSelector, '1990-01-01')
            .typeText(this.emailInputSelector, email)
            .typeText(this.phoneInputSelector, '1234567890') // Example phone number 
            .typeText(this.streetAddress1InputSelector, street1)
            .typeText(this.streetAddress2InputSelector, street2)
            .typeText(this.cityInputSelector, 'New York') // Example city
            .typeText(this.stateInputSelector, 'NY') // Example state
            .typeText(this.postalCodeInputSelector, '10001') // Example postal code
            .typeText(this.countryInputSelector, 'USA') // Example country
            .click(this.saveButtonSelector);
    }

    async logoutButtonExists(){
        return await this.logoutButtonSelector.exists;
    }
}
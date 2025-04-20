import { ContactsPage } from '../pages/contactsPage';
import { env } from 'process';
import { userRole } from '../../data/roles';
import { generateRandomContact } from '../../data/contactGenerator';


const contacts = new ContactsPage();

fixture('Contact List app tests')
    .beforeEach(async t => {
        await t.maximizeWindow(); // Maximize the window before each test
        await t.useRole(userRole('https://thinking-tester-contact-list.herokuapp.com/', env.UIUSER as string, env.UIPWD as string)); // Use the user role for login
    })

test('User can populate contact list with random valid data from file', async t => {
    await contacts.addContactFromFile('../../data/users.json');
    await t.expect(contacts.logoutButtonExists()).ok();
});

test.only('User can populate contact list with random valid data from file', async t => {
    
    const randomContact = generateRandomContact();

    await contacts.addContactRandomData(randomContact);

    const check = await contacts.validateContactPresence(randomContact);
    await t.expect(check).eql(true);

});
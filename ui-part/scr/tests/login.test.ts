import { ContactsPage } from '../pages/contactsPage';
import { env } from 'process';
//import * as dotenv from 'dotenv';
import { userRole } from '../../data/roles';
//dotenv.config();

const contacts = new ContactsPage();

fixture('Login Tests')
    .beforeEach(async t => {
        await t.maximizeWindow(); // Maximize the window before each test
        await t.useRole(userRole('https://thinking-tester-contact-list.herokuapp.com/', env.UIUSER as string, env.UIPWD as string)); // Use the user role for login
    })

test('User can log in with valid credentials', async t => {
    await contacts.addContactFromFile('../../data/users.json');
    await t.expect(contacts.logoutButtonExists()).ok();
});
import { LoginPage } from '../pages/loginPage';
import { ContactsPage } from '../pages/contactsPage';
import * as dotenv from 'dotenv';
import { userRole } from '../roles';
dotenv.config();

const loginPage = new LoginPage();
const contactsPage = new ContactsPage();

fixture('Login Tests')
    .beforeEach(async t => {
        await t.maximizeWindow(); // Maximize the window before each test
        await t.useRole(userRole('https://thinking-tester-contact-list.herokuapp.com/', process.env.UIUSER as string, process.env.UIPWD as string)); // Use the user role for login
    })

test('User can log in with valid credentials', async t => {
  //  await loginPage.login(process.env.UIUSER as string, process.env.UIPWD as string); // Replace with test credentials
    // Add assertions here to verify successful login


    await contactsPage.logoutButtonExists();
});
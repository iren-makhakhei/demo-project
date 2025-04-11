import { Role } from 'testcafe';
import { LoginPage } from './pages/loginPage';

const loginPage = new LoginPage();

export const userRole = (pageAddress: string, user: string, pass: string) => Role(`${pageAddress}`, async t => {
    await loginPage.login(user, pass); 
}, { preserveUrl: true });
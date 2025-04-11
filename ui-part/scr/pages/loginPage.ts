import { Selector, t } from 'testcafe';

export class LoginPage {
    usernameInput: Selector;
    passwordInput: Selector;
    loginButton: Selector;

    constructor() {
        this.usernameInput = Selector('#email'); 
        this.passwordInput = Selector('#password'); 
        this.loginButton = Selector('#submit'); 
    }

    async login(username: string, password: string): Promise<void> {
        await t
            .typeText(this.usernameInput, username)
            .typeText(this.passwordInput, password)
            .click(this.loginButton);
    }
}
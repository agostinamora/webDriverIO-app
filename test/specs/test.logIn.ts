import info from '../data/logInAccountsInfo.json'
import LoginFormPage from '../pageobjects/loginForm.page.js'

describe('Log in', () => {
    it('enter an account', async () => {
        await LoginFormPage.chooseLogIn()
            for (const account of info) {
                await LoginFormPage.logInUser(account.email, account.password)
            }
            }
    )
})


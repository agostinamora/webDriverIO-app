//import { expect } from '@wdio/globals'
import info from '../data/signUpAccountsInfo.json'
import LoginFormPage from '../pageobjects/loginForm.page.js'

describe('Sign up', () => {
    it('create an account', async () => {
        await LoginFormPage.chooseSignUp()
            for (const account of info) {
                await LoginFormPage.signUpUser(account.email, account.password, account.confirmPassword)
            }
            }
    )
})


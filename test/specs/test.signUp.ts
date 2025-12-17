import { skip } from 'node:test'
import info from '../data/signUpAccountsInfo.json'
import LoginFormPage from '../pageobjects/loginForm.page.js'

describe('Sign up', () => {
    it.skip('create an account', async () => {
        await LoginFormPage.chooseSignUp()
            for (const account of info) {
                await LoginFormPage.signUpUser(account.email, account.password, account.confirmPassword)
            }
            }
    )
})


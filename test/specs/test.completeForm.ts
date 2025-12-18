import { skip } from 'node:test'
import formPage from '../pageobjects/form.page.ts'

describe('Form', () => {
    it ('complete form', async () => {
        await formPage.chooseForm()
        await formPage.completeInputField()
        await formPage.clickSwitch()
        await formPage.chooseOptionDropdown()
        await formPage.clickButtons()
})
})

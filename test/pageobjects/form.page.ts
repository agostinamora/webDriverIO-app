import { $ } from '@wdio/globals'
import { Locators } from './locators'
import logger from '../utils/logger';
import chalk from 'chalk';

class FormPage {

    public get formMenu(){
        return $(Locators.formMenuOption)
    }

    public get formTitle(){
        return $(Locators.formTitleTxt)
    }

    public get inputField(){
        return $(Locators.firstInputField)
    }

    public get textField(){
        return $(Locators.secondInputField)
    }

    public get switchText() {
        return $(Locators.switchText);
    }

    public get switchBtn() {
        return $(Locators.switchBtn);
    }

    public get activeButton() {
        return $(Locators.buttonActive);
    }

    public get cancelBtn() {
        return $(Locators.cancelFormBtn);
    }

    public get askMeLaterBtn() {
        return $(Locators.askMeLaterFormBtn);
    }

    public get okBtn() {
        return $(Locators.okButtonSignUpAlert);
    }

    public get activePopUp() {
        return $(Locators.popUpActive);
    }

    public get dropdownOptions() {
        return $$(Locators.dropdownOptions);
    }

    public get dropdown() {
        return $(Locators.dropdown);
    }


    async chooseForm() {
        try{
            await this.formMenu.click()
            logger.info(chalk.green('The user clicks on the Form menu option'))
            await this.formTitle.isDisplayed()
            logger.info(chalk.green('The user is on the form'))
        }
        catch (error){
            logger.error(chalk.red('The user cannot enter the form'))
            await browser.saveScreenshot('./screenshots/form_fail.png')
            throw error
        }  
    }

    async completeInputField() {
        try{
            await this.inputField.setValue("testeando")
            logger.info(chalk.green(`The input field is complete with the text: "testeando"`))
            await this.textField.isDisplayed()
            const textWritten = await this.textField.getText()
            if (textWritten == "testeando"){
                logger.info(chalk.green(`The second field is complete with ${textWritten} and its the same as the first one`))
            }
            else{
                logger.error(chalk.red('The fields are not completed with the same text'))
                await browser.saveScreenshot('./screenshots/second_field_fail.png')
            }
            }
        catch (error){
            logger.error(chalk.red('Unkown fail'))
            throw error
        }  
    }

    async clickSwitch() {
        try{
            const switchInfo = await this.switchText.getText()
            if (switchInfo == "OFF"){
                await this.switchBtn.click()
                logger.info(chalk.green('The switch is now ON'))
            }
            else{
                await this.switchBtn.click()
                logger.info(chalk.green('The switch is now OFF'))
            }
        }  
        catch (error){
                throw error
            }
        }

    async chooseOptionDropdown() {
        try {
            await this.dropdown.waitForDisplayed()
            await this.dropdown.click()
            logger.info(chalk.green('Dropdown opened'))

            const totalOptions = (await this.dropdownOptions).length
            for (let i = 0; i < await totalOptions; i++) {
                const options = await this.dropdownOptions
                const text = await options[i].getText()
                await options[i].click()
                logger.info(chalk.green(`Option ${i + 1}: ${text}`))
                await this.dropdown.click()
                if (i === await totalOptions - 1) {
                    await options[i].click()
                }
            }
            
        } catch (error) {
            logger.error(chalk.hex('#FF0000')('Error selecting dropdown options'))
            throw error;
            }
        }

    async clickButtons() {
        try{
            const options = [this.askMeLaterBtn, this.okBtn, this.cancelBtn]

            await this.activeButton.waitForDisplayed()
            for (const option of options) {
                await this.activeButton.click()
                logger.info(chalk.green(`The button is active`))
                await this.activePopUp.waitForDisplayed()
                logger.info(chalk.green(`The button pop up appears`))
                const buttonText = await option.getText();
                await option.click()
                logger.info(chalk.green(`The button clicked is: ${buttonText}`));
            }
        }
        catch (error){
            throw error
            }
        }

}




export default new FormPage();

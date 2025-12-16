import { $ } from '@wdio/globals'
import { Locators } from './locators'
import logger from '../utils/logger';
import chalk from 'chalk';

class LoginFormPage {

    public get logInMenu(){
        return $(Locators.logInMenuOption)
    }

    public get logInOption(){
        return $(Locators.loginFormButton)
    }

    public get signUpOption(){
        return $(Locators.signUpFormButton)
    }

    public get emailField () {
        return $(Locators.emailInput);
    }

    public get passwordField () {
        return $(Locators.passwordInput);
    }

    public get confirmPasswordField () {
        return $(Locators.confirmPasswordInput);
    }

    public get logInUserBtn () {
        return $(Locators.logInButton);
    }

    public get signUpUserBtn () {
        return $(Locators.signUpButton);
    }

    public get popUpCreationSuccesfully() {
        return $(Locators.popUpSignUpSuccesfully);
    }

    public get okBtn() {
        return $(Locators.okButtonSignUpAlert);
    }

    public get messageFailedEmail() {
        return $(Locators.emailErrorMessage);
    }

    public get messageFailedPassword() {
        return $(Locators.passwordErrorMessage);
    }

    public get messageFailedConfirmPassword() {
        return $(Locators.confirmPassErrorMessage);
    }

    async chooseLogIn() {
        try{
            await this.logInMenu.click()
            logger.info(chalk.green('The user clicks on the Login menu option'))
            await this.logInOption.click()
            logger.info(chalk.green('The user choose to log in'))
        }
        catch (error){
            logger.error(chalk.red('The user cannot enter its account'))
            await browser.saveScreenshot('./screenshots/log_in_fail.png')
            throw error
        }  
    }

    async chooseSignUp() {
        try{
            await this.logInMenu.click()
            logger.info(chalk.green('The user clicks on the Login menu option'))
            await this.signUpOption.click()
            logger.info(chalk.green('The user choose to sing up'))
            }
        catch (error){
            logger.error(chalk.red('The user cannot create its account'))
            await browser.saveScreenshot('./screenshots/sign_up_fail.png')
            throw error
        }  
    }

    async logInUser(email: string, password: string) {
        try{
            await this.emailField.setValue(email)
            logger.info(chalk.green(`The email used is: ${email}`))
            await this.passwordField.setValue(password)
            logger.info(chalk.green(`The password used is: ${password}`))
            await this.logInUserBtn.click()
            logger.info(chalk.green('The user clicks on the Login button'))
        }
        catch (error){
            await browser.saveScreenshot('./screenshots/log_in_user_fail.png')
            throw error
        }
    }

    async signUpUser(email: string, password: string, confPass: string) {
        try{
            await this.emailField.setValue(email)
            logger.info(chalk.green(`The email used is: ${email}`))
            await this.passwordField.setValue(password)
            logger.info(chalk.green(`The password used is: ${password}`))
            await this.confirmPasswordField.setValue(confPass)
            logger.info(chalk.green(`The confirmation password used is: ${confPass}`))
            await this.signUpUserBtn.click()
            logger.info(chalk.green('The user clicks on the Sign up button'))
            await this.popUpCreationSuccesfully.waitForDisplayed()
            await this.okBtn.click()
            logger.info(chalk.green('The sign up was done successfully'))
        }  
        catch (error){
            try {
                await this.checkSignUpErrors()
            }
            catch (validationError){
                throw validationError;
            }
        }
    }

    async checkSignUpErrors() {
    try {
        const errorChecks = [
            { element: this.messageFailedEmail, name: 'email_fail' },
            { element: this.messageFailedPassword, name: 'password_fail' },
            { element: this.messageFailedConfirmPassword, name: 'confirm_password_fail' }
        ];

        let errorsFound = 0;

        for (const check of errorChecks) {
            if (await check.element.isDisplayed()) {
                const errorText = await check.element.getText()
                logger.error(chalk.hex('#FF0000')(`Failed in ${check.name}: ${errorText}`));
                await browser.saveScreenshot(`./screenshots/${check.name}.png`);
                errorsFound++;
            }
        }

        if (errorsFound > 0) {
            logger.warn(chalk.hex('#FFA500')(`We found ${errorsFound} errors in total.`));
        }

    }catch (error) {
        logger.error('Unknown fail');
        throw error;
    }
}
}




export default new LoginFormPage();

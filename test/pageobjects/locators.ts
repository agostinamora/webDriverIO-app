export const Locators = {
    logInMenuOption: '-android uiautomator:new UiSelector().description("Login")',
    loginFormButton: '-android uiautomator:new UiSelector().text("Login")',
    signUpFormButton: '-android uiautomator:new UiSelector().text("Sign up")',
    emailInput: 'accessibility id:input-email',
    passwordInput: 'accessibility id:input-password',
    confirmPasswordInput: 'accessibility id:input-repeat-password',
    logInButton: 'accessibility id:button-LOGIN',
    signUpButton: 'accessibility id:button-SIGN UP',
    popUpSignUpSuccesfully: '//android.widget.TextView[@resource-id="android:id/alertTitle" and @text="Signed Up!"]',
    popUpLogInSuccesfully: '//android.widget.TextView[@resource-id="android:id/message" and @text="You are logged in!"]',
    okButtonSignUpAlert: '//android.widget.Button[@text="OK"]',
    emailErrorMessage: '-android uiautomator:new UiSelector().text("Please enter a valid email address")',
    passwordErrorMessage: '-android uiautomator:new UiSelector().text("Please enter at least 8 characters")',
    confirmPassErrorMessage: '-android uiautomator:new UiSelector().text("Please enter the same password")'
}
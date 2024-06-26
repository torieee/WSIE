// Emailjs Credentials
const SERVICE_ID = "service_6ivuvhw";
const PUBLIC_KEY = "YaAzvO7B3lldSIpqe";
// Additional - unsure if needed originated from verificationCode.js
// const SERVICE_ID = "service_ms0318i";
// const PUBLIC_KEY = "8nKeoQjoIWF1wyUpG";

// Template / Template ID
const NEW_USER = "newUser"
const NEW_USER_TEMPLATE_ID = "template_lfefu0m";
const FORGOT_PASSWORD = "forgotPassword";
const FORGOT_PASSWORD_TEMPLATE_ID = "template_zekzics";
const RESEND = "resend";
const RESEND_TEMPLATE_ID = "template_7av6tqc";

// Message
const SENDING_FROM_TEMPLATE_MESSAGE = "Sending verification code from template:";
const VERIFICATION_CODE_MESSAGE = "Verification Code from Server:";
const SUCCESS_MESSAGE = "Successfully sent email:";
const FAILED_MESSAGE = "Failed to send email:";

var emailWrapper = (() => {

  /**
   * Handles sending the verification code to the user's email
   * 
   * @param {*} fullName The fullname of the user
   * @param {*} email The email of the user
   * @param {*} verificationCode The verification code for the user
   * @param {*} emailjs The emailjs script
   * @param {*} template The template where this request is from
   * @param {*} username The username of the user
   * @returns True if the email sent, false otherwise
   */
  function sendEmail(fullName, email, verificationCode, emailjs, template, username) {
    var templateID;

    if (template === NEW_USER || template == RESEND) {
      templateID = NEW_USER_TEMPLATE_ID;
    } else if (template === FORGOT_PASSWORD) {
      templateID = FORGOT_PASSWORD_TEMPLATE_ID;
    }

    console.log(SENDING_FROM_TEMPLATE_MESSAGE, template);
    console.log(VERIFICATION_CODE_MESSAGE, verificationCode);

    const params = {
      userEmail: email,
      username: username,
      userFullName: fullName,
      verificationCode: verificationCode,
    }

    emailjs.send(SERVICE_ID, templateID, params, PUBLIC_KEY)
      .then(function (response) {
        console.log(SUCCESS_MESSAGE, response.status, response.text);
        return true;
      }, function (error) {
        console.log(FAILED_MESSAGE, error);
      });

    return false;
  }

  return {
    sendEmail
  }
})();
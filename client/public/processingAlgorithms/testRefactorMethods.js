var loginHandler2 = (() => {
    
  //_____________________________________________Exported Methods_______________________________________________________

    var togglePassword = (passwordInput, idString) => {

        var password = document.getElementById(passwordInput);
        var passwordToggler = document.getElementById(idString);
        passwordToggler.classList.toggle("bi-eye");
        if(password.type === "password"){
          password.type = "text";
        } else{
          password.type = "password";
        }
      }

    
      function checkIfUserInputIsViable(fullName, email, username, password, confirmedPassword){
        const passwordIsValid = checkIfPasswordIsValid(password);
        
        if(!checkIfAllFieldsAreFilledIn(fullName, email, username, password)) {
          return 1;
        } else if(!checkIfEmailAddressIsValid(email)) {
          return 2;
        } else if(!checkIfUserNameHasValidChars(username)) {
          return 3;
        } else if(!checkIfUserNameIsCorrectLength(username)) {
          return 4;
        } else if(!passwordIsValid) {
          return 5;
        } else if(!checkIfPasswordsMatch(password, confirmedPassword)) {
          return 6;
        }
  
        return 0;
      }

      function getVerificationMessage(userInputViabilityNumber){
        switch(userInputViabilityNumber){
          case 1:
            return 'Please make sure all fields are filled in.';
          case 2:
            return 'Please enter a valid email address.';
          case 3:
            return 'Username must not contain special characters.';
          case 4:
            return 'Please ensure that username is between 4 and 15 characters.';
          case 5:
            return 'Please ensure that password is between 8-15 characters, contains at least one capital and lowercase letter, and contains a number.';
          case 6:
            return 'Please ensure that passwords match.';
          default:
            return 'Success';
        }
      }



      //________________________________Helper Methods____________________________________________________-


      function checkIfAllFieldsAreFilledIn(fullName, email, username, password){
        if(fullName === '' || email === '' || username === '' || password === ''){
          console.log("fields not filled in");
          return false;
        }
        return true;
      }
  
      function checkIfEmailAddressIsValid(email) {
        // string@string.string is the meaning of the below variable
        var validEmailFormat = /\S+@\S+\.\S+/;
        if(!validEmailFormat.test(email)){
          console.log("email not valid");
          return false;
        }
        return true;
      }
  
      function checkIfUserNameHasValidChars(username) {
        var alphaNumberic = /^[0-9a-z]+$/i;
        if(!username.match(alphaNumberic)){
          return false;
        }
        return true;
      }
  
      function checkIfUserNameIsCorrectLength(username){
        if(username.length > 15 || username.length < 4){
          return false;
        }
        return true;
      }
  
      function checkIfPasswordIsValid(password) {
        // password minimum length is between 8 and 15 characters, has at least one number, one capital letter, and one lowercase letter
        var hasNumber = /\d/;
        var hasCapitalLetter = /[A-Z]/;
        var hasLowercaseLetter = /[a-z]/;
  
        if(!checkPasswordLength(password)){
          return false;
        }
        if(!checkIfPasswordContainsNumber(password, hasNumber)){
          return false;
        }
        if(!checkIfPasswordContainsCapitalLetter(password, hasCapitalLetter)){
          return false;
        }
        if(!checkIfPasswordContainsLowercaseLetter(password, hasLowercaseLetter)){
          return false;
        }
        
        return true;
      }

      function checkPasswordLength(password){
        if(password.length > 15 || password.length < 8){
          console.log("password incorrect length");
          return false;
        }
        return true;
      }
  
      function checkIfPasswordContainsNumber(password, hasNumber){
        if(!hasNumber.test(password)){
          console.log("no number in password");
          return false;
        }
        return true;
      }
  
      function checkIfPasswordContainsCapitalLetter(password, hasCapitalLetter){
        if(!hasCapitalLetter.test(password)){
          console.log("no capital letter in password");
          return false;
        }
        return true;
      }
  
      function checkIfPasswordContainsLowercaseLetter(password, hasLowercaseLetter){
        if(!hasLowercaseLetter.test(password)){
          console.log("no lowercase letter in password");
          return false;
        }
        return true;
      }
  
      function checkIfPasswordsMatch(password, confirmedPassword){
        if(password != confirmedPassword) { //Password verification
          console.log("passwords don't match");
          return false;
        }
        return true;
      }
    
    return {
        togglePassword,
        checkIfUserInputIsViable,
        getVerificationMessage
      };
})();
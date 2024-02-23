const testEndpoints = require('./serverAPIcalls');
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const endpoints = require('../routes/endpoints');
const app = express();


//_______________________________Non-authenticated endpoints_________________________________________________________________
// test('Verification code is generated', async () => {
//     try {
//       const response = await testEndpoints.GETverificationCode();
//       expect(response).not.toBe(null);
//     } catch (error) {
//       console.log(error);
//       throw new Error ("Error occurred. Failing.");
//     }
// });

// test('Verification code is a string of six digits', async () => {
//   try{
//     const response = await testEndpoints.GETverificationCode();
//     expect(response).toMatch(/^\d{6}$/); 
//   } catch (error) {
//     console.log(error);
//     throw new Error ("Error occurred. Failing.");
//   }
// });

// test('Verification codes are unique', async () => {
//     try{
//       const response1 = await testEndpoints.GETverificationCode();
//       const response2 = await testEndpoints.GETverificationCode();
//       const response3 = await testEndpoints.GETverificationCode();
//       expect(response1).not.toBe(response2);
//       expect(response2).not.toBe(response3);
//       expect(response1).not.toBe(response3);
//     } catch (error) {
//       console.log(error);
//       throw new Error ("Error occurred. Failing.");
//     } 
// });

// test('User info requested for unregistered email gives user not found error', async () => {
//   const fakeEmail = 'thisemailisfake@fakedomain.com';
//   await expect(testEndpoints.GETrequestInfoForPasswordReset(fakeEmail))
//         .resolves.toEqual(expect.objectContaining({ error: 'User not found' }));
// });

// //This will not pass if database clears. Need to figure that out.
// test('User info requested for registered user returns information', async () => {
//   const newUser = await testEndpoints.POSTregisterDummyUser();
//   console.log("New user: ", newUser);

//   const email = 'thisisafakeemail@fakedomain.com';
//   const response = await testEndpoints.GETrequestInfoForPasswordReset(email);

//   console.log(response.userName)
//   expect(response.userName).not.toBe(null); 
// });


// test('Unverified user password change is unsuccessful', async () => {
//   const email = 'thisemailisfake@fakedomain.com';
//   const username = 'fakeUser';
//   const password = 'fakepassword';
//   const response = await testEndpoints.PUTchangePassword(email, username, password);
//   expect(response.error).toBe("User not found");
// });


//________________________________________________Authentication Endpoints________________________________________________
//Checks authentication


// Test Middleware (same as in real server)
endpoints.use(session({
    secret: 'myveryfirstemailwasblueblankeyiscute@yahoo.com',
    resave: false,
    saveUninitialized: false
}));

const mockRequest = (sessionData) => {
  return {
    session: { data: sessionData },
  };
};
const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};


describe('Authenticated endpoints', () => {
  
  it('should register a dummy user', async () => {
    //get verification code to put in the body
    const verificationCode = await testEndpoints.GETverificationCode();
    console.log("verification code: ", verificationCode);

    //body of the user registration request
    const req = 
      {
        fullName: 'Test User',
        userName: 'test',
        password: 'Testtest1',
        email: 'thisisafakeemail@fakedomain.com',
        verificationCode: verificationCode,
        diet: [],
        health: [],
        favorites: []
      };
    const response = await testEndpoints.POSTregisterDummyUser(req);
    console.log('Full response:', response); //this works
    expect(response.status);

    console.log(response.status);
  });

    
   
});


test('Database clears', async () => {
  try{
    const response = await testEndpoints.GETclearDatabase();
    expect(response.acknowledged).toBe(true);
  } catch (error) {
    console.log(error);
    throw new Error ("Error occurred. Failing.");
  }
});




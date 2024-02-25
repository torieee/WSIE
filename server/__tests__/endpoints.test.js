const testEndpoints = require('./serverAPIcalls');
const request = require('supertest');
const express = require('express');
const session = require('express-session');
const endpoints = require('../routes/endpoints');
const app = express();


//_______________________________Non-authenticated endpoints_________________________________________________________________
// test('Database clears', async () => {
//   try{
//     const response = await testEndpoints.GETclearDatabase();
//     console.log(response);
//     expect(response.acknowledged).toBe(true);
//   } catch (error) {
//     console.log(error);
//     throw new Error ("Error occurred. Failing.");
//   }
// });


test('Verification code is generated', async () => {
    try {
      const response = await testEndpoints.GETverificationCode();
      expect(response).not.toBe(null);
    } catch (error) {
      console.log(error);
      throw new Error ("Error occurred. Failing.");
    }
});

test('Verification code is a string of six digits', async () => {
  try{
    const response = await testEndpoints.GETverificationCode();
    expect(response).toMatch(/^\d{6}$/); 
  } catch (error) {
    console.log(error);
    throw new Error ("Error occurred. Failing.");
  }
});

test('Verification codes are unique', async () => {
    try{
      const response1 = await testEndpoints.GETverificationCode();
      const response2 = await testEndpoints.GETverificationCode();
      const response3 = await testEndpoints.GETverificationCode();
      expect(response1).not.toBe(response2);
      expect(response2).not.toBe(response3);
      expect(response1).not.toBe(response3);
    } catch (error) {
      console.log(error);
      throw new Error ("Error occurred. Failing.");
    } 
});

test('User info requested for unregistered email gives user not found error', async () => {
  const fakeEmail = 'thisemailisfake@fakedomain.com';
  await expect(testEndpoints.GETrequestInfoForPasswordReset(fakeEmail))
        .resolves.toEqual(expect.objectContaining({ error: 'User not found' }));
});



test('Unverified user password change is unsuccessful', async () => {
  const email = 'thisemailisfake@fakedomain.com';
  const username = 'fakeUser';
  const password = 'fakepassword';
  const response = await testEndpoints.PUTchangePassword(email, username, password);
  expect(response.error).toBe("User not found");
});


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
  
  it('Register a dummy user', async () => {
    const verificationCode = await testEndpoints.GETverificationCode();
    const req = 
      {
        fullName: 'Test User',
        userName: 'test',
        password: 'Testtest1',
        email: 'thisisafakeemail@fakedomain.com',
        verificationCode: verificationCode
      };

    const response = await testEndpoints.POSTregisterDummyUser(req);
    expect(response.fullName).not.toBe(undefined); //if user is saved and user does not already exist
    expect(response.error).toBe(undefined);
  });

  it('User is not verified with incorrect verification code', async () => {
    const req = 
      {
        userName: 'test',
        password: 'Testtest1',
        verificationCode: 123456
      };
    const response = await testEndpoints.PUTverifyUser(req);
    expect(response).toBe(undefined); 
  });


  it('Throw user already exists error when new user signs up with existing user credentials', async () => {
    const verificationCode = await testEndpoints.GETverificationCode();
    const req = 
      {
        fullName: 'Test User',
        userName: 'test',
        password: 'Testtest1',
        email: 'thisisafakeemail@fakedomain.com',
        verificationCode: verificationCode
      };
    const response = await testEndpoints.POSTregisterDummyUser(req);
    expect(response.error).not.toBe(undefined); //when user already exists, we get {error: User already exists}
  });






  // it('Existing username is found ', async () => {
  //   const req = 
  //     {
  //       userName: 'test',
  //       password: 'Testtest1'
  //     };
  //   const response = await testEndpoints.POSTfindUsername(req);
  //   console.log("RESPONSE: ", response);
  //   expect(response.error).not.toBe(undefined); //when user already exists, we get {error: User already exists}
  // });


  it('mocked db clears', async () => {
    jest.clearAllMocks();

     global.fetch = jest.fn().mockImplementationOnce(() =>
        Promise.resolve({
            status: 200,
            json: () => Promise.resolve(
              {
                acknowledged: true
              }
            ),
        })
    )

    const acknoledgement = await testEndpoints.GETclearDatabase();
    expect(acknoledgement.acknowledged).toBe(true);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/v1/clearUserDatabase', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  });
   
});


// test('Database clears', async () => {
//   try{
//     const response = await testEndpoints.GETclearDatabase();
//     console.log(response);
//     expect(response.acknowledged).toBe(true);
//   } catch (error) {
//     console.log(error);
//     throw new Error ("Error occurred. Failing.");
//   }
// });




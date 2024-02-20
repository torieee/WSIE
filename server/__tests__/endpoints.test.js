const testEndpoints = require('./serverAPIcalls');

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

//This will not pass if database clears. Need to figure that out.
test('User info requested for registered user returns information', async () => {
  const email = 'victoriamthacker@gmail.com';
  const response = await testEndpoints.GETrequestInfoForPasswordReset(email);
  expect(response.userName).not.toBe(null); 
});


test('Unverified user password change is unsuccessful', async () => {
  const email = 'thisemailisfake@fakedomain.com';
  const username = 'fakeUser';
  const password = 'fakepassword';
  const response = await testEndpoints.PUTchangePassword(email, username, password);
  expect(response.error).toBe("User not found");
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




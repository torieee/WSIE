const testEndpoints = require('./serverAPIcalls');

test('Database clears', async () => {
    try{
      const response = await testEndpoints.GETclearDatabase();
      expect(response.acknowledged).toBe(true);
    } catch (error) {
      console.log(error);
      throw new Error ("Error occurred. Failing.");
    }
});

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




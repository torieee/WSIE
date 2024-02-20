const host = 'http://localhost:8080';

async function GETclearDatabase() {
    const url = '/api/v1/clearUserDatabase';
    var response = await GET(url);
    return response;
}

async function GETverificationCode() {
    const url = '/api/v1/users/getVerificationCode';
    var response = await GET(url);
    return response;
}

async function GETrequestInfoForPasswordReset(email) {
    const url = `/api/v1/users/requestInfoForPasswordReset?email=${email}`;
    var response = await GET(url);
    return response;
}


  async function GET(url) {
    let JSONresponse;
    try {
      const response = await fetch(`${host}${url}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      JSONresponse = await response.json();

    } catch (error) {
      console.error('Fetch error:', error);
    }
    return JSONresponse;
  }

module.exports = {
  GETclearDatabase,
  GETverificationCode,
  GETrequestInfoForPasswordReset,
};

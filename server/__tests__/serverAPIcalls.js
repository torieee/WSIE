const host = 'http://localhost:8080';

async function GETclearDatabase() {
    const url = `/api/v1/clearUserDatabase`;
    var response = await GET(url);
    return response;
}

async function GETverificationCode() {
    const url = `/api/v1/users/getVerificationCode`;
    var response = await GET(url);
    return response;
}

async function GETrequestInfoForPasswordReset(email) {
    const url = `/api/v1/users/requestInfoForPasswordReset?email=${email}`;
    var response = await GET(url);
    return response;
}

async function PUTchangePassword(email, username, password) {
    const url = `/api/v1/users/changePassword`;
    var body = {
        email: email,
        userName: username, 
        password: password
    };
    var response = await PUT(url, body);
    return response;
}

async function POSTtestNewUser() {
    const url = `/api/v1/users/testNewUser`;
    var body = {};
    var response = await POST(url, body);
    return response;
}

async function POSTregisterDummyUser(req) {
    const url = `/api/v1/users/register`;
    // var body = {
    //     fullName: "Test User",
    //     userName: "test",
    //     password: "Testtest1", 
    //     email: "thisisafakeemail@fakedomain.com",
        
    // };
    var response = await POST(url, req);
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
        console.error('GET Fetch error:', error);
    }
    return JSONresponse;
}

async function PUT(url, body){
    try {
        const response = await fetch(`${host}${url}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const JSONresponse = await response.json();
        return JSONresponse;
    } catch(error) {
        console.error('PUT Fetch error:', error.message);
    }
}

async function POST(url, body){
    try {
        const response = await fetch(`${host}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        const JSONresponse = await response.json();
        return JSONresponse;
    } catch(error) {
        console.error('PUT Fetch error:', error.message);
    }
}


module.exports = {
  GETclearDatabase,
  GETverificationCode,
  GETrequestInfoForPasswordReset,
  PUTchangePassword,
  POSTtestNewUser,
  POSTregisterDummyUser
};

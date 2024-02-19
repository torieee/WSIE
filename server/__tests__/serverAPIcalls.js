const host = 'http://localhost:8080';

async function GETclearDatabase() {
  const url = `${host}/api/v1/clearUserDatabase`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

async function GETverificationCode() {
    const url = `${host}/api/v1/users/getVerificationCode`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching verification code:', error.message);
        throw error;
    }
}

module.exports = {
  GETclearDatabase,
  GETverificationCode,
};

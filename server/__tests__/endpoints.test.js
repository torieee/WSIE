const request = require('supertest');
const express = require('express');
const endpoints = require('../routes/endpoints.js');
const app = express();

// Update the server address to match where your server is running
app.use('/api/v1', endpoints);


test('Server is reachable', async () => {
  var requestOptions = {
    method: 'GET',
  };
  
  fetch("http://localhost:8080/api/v1/clearUserDatabase", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  //console.log('Server test response:', response.body);
  expect(response.status).toBe(200);
});


// // Your testing suite
// describe('Endpoint tests', () => {
//   test('GET /clearDatabase', async () => {
//     const response = await request(endpoints).get('/api/v1/clearUserDatabase');
//     expect(response.status).toBe(200);
//     expect(response.body.acknowledged).toBe("true");
//   });

//   // More tests go here
// });
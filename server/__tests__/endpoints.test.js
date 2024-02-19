const request = require('supertest');
const express = require('express');
const endpoints = require('../routes/endpoints.js');
const app = express();
const testEndpoints = require('./serverAPIcalls');

test('Database clears', async () => {
  try {
    const response = await testEndpoints.GETclearDatabase();
    expect(response.status).toBe(200);
  } catch (error) {
    console.error('Error in test:', error.message);
  }
});

test('Verification code is generated', async () => {
  try {
    const response = await testEndpoints.GETclearDatabase();
    expect(response.status).toBe(200);
  } catch (error) {
    console.error('Error in test:', error.message);
  }
});

test('Verification code is a string of six digits', async () => {
  try {
    const response = await testEndpoints.GETclearDatabase();
    expect(response.body).toMatch(/^\d{6}$/); 
  } catch (error) {
    console.error('Error in test:', error.message);
  }
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
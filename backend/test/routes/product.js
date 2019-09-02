const assert = require('assert');

const axios = require('axios');

const env = require('../../config/env');

const endpoint = `http://localhost:${env.PORT}/api/v1`;

describe('', () => {
  it('Get all products', async () => {
    try {
      const loginData = {
        username: 'test',
        password: 'test',
      };
      const auth = await axios.post(`${endpoint}/login`, loginData);
      const config = {
        headers: {
          Authorization: `Token ${auth.data.user.token}`,
        },
      };
      const data = await axios.get(`${endpoint}/products`, config);
      assert.equal(data.status, 200);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);

  // Commented so a new product is not added every single time there's a test.
  /*
  it('Create a product', async () => {
    let loginData = {
      username: 'test',
      password: 'test'
    };
    const auth = await axios.post(`${endpoint}/login`, loginData);
    let cf = {
      headers: {
        Authorization: `Token ${auth.data.user.token}`,
      }
    }
    const testData = {
      name: 'CreateProduct Test',
      description: 'Unit test',
      quantity: 0,
    };
    try {
      const data = await axios.post(`${endpoint}/create-product`, testData, cf);
      assert.equal(data.status, 201);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);
  */

  it('No authentication token', async () => {
    try {
      const data = await axios.get(`${endpoint}/products`);
      assert.fail(data); // Should not get here because no authentication
    } catch (e) {
      assert(e.response.status, 401);
    }
  }).timeout(5000);

  it('Update product', async () => {
    try {
      const loginData = {
        username: 'test',
        password: 'test',
      };
      const auth = await axios.post(`${endpoint}/login`, loginData);
      const config = {
        headers: {
          Authorization: `Token ${auth.data.user.token}`,
        },
      };
      const data = await axios.get(`${endpoint}/products`, config);
      const randomNumber = Math.floor(Math.random() * data.data.length) + 1;
      const randomProduct = data.data[randomNumber];
      console.log(randomProduct);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);
});

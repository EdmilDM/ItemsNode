const assert = require('assert');

const axios = require('axios');

const env = require('../../config/env');

const endpoint = `http://localhost:${env.PORT}/api/v1`;

describe('', () => {
  it('Get all products', async () => {
    try {
      let loginData = {
        username: 'test',
        password: 'test'
      };
      const auth = await axios.post(`${endpoint}/login`, loginData);
      let config = {
        headers: {
          Authorization: `Token ${auth.data.user.token}`,
        }
      }
      const data = await axios.get(`${endpoint}/products`, config);
      assert.equal(data.status, 200);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);

  it('Create a product', async () => {
    let loginData = {
      username: 'test',
      password: 'test'
    };
    const auth = await axios.post(`${endpoint}/login`, loginData);
    let config = {
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
      const data = await axios.post(`${endpoint}/create-product`, testData, config);
      assert.equal(data.status, 200);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);
});

const assert = require('assert');

const axios = require('axios');

const env = require('../../config/env');

const endpoint = `http://localhost:${env.PORT}/product`;

describe('', () => {
  it('Get all products', async () => {
    try {
      const data = await axios.get(`${endpoint}/products`);
      assert.equal(data.status, 200);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);

  it('Create a product', async () => {
    const testData = {
      name: 'CreateProduct Test',
      description: 'Unit test',
      quantity: 0,
    };
    try {
      const data = await axios.post(`${endpoint}/create-product`, testData);
      assert.equal(data.status, 200);
      assert(data.data);
    } catch (e) {
      assert.fail(e);
    }
  }).timeout(5000);
});

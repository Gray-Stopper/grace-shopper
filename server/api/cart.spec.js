/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const Products = db.model('productsInOrder')

describe('Product routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/:userId/:orderId', () => {
    const fakeOrder = '2'
    beforeEach(() => {
      return Products.create({
        orderId: '1',
        productId: '2'
      })
    })

    it('GET /api/products', async () => {
      const res = await request(app)
        .get('/api/8/1')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body[0].productId).to.be.equal(fakeOrder)
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

import {app, sequelize} from "../express";
import request from 'supertest'

describe('E2E test for produt', () => {

    beforeEach(async () => {
        await sequelize.sync({force: true})
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a product', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product',
                price: 10,
            })

        expect(response.status).toBe(200)

        expect(response.body.name).toBe('Product')
        expect(response.body.price).toBe(10)
    })

    it('should list all products', async () => {
        const response = await request(app)
            .post('/product')
            .send({
                name: 'Product',
                price: 10,
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .get('/product')
            .send()

        const product = response2.body.products[0]
        expect(product.name).toEqual('Product')
        expect(product.price).toEqual(10)
    })
})
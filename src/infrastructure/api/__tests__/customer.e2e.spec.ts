import {app, sequelize} from "../express";
import request from 'supertest'

describe('E2E test for customer', () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John',
                address: {
                    street: 'Street',
                    number: 1,
                    zip: '123',
                    city: 'SP',
                    country: 'BR',
                }
            })

        expect(response.status).toBe(200)
        expect(response.body.name).toBe('John')
        expect(response.body.address.street).toBe('Street')
        expect(response.body.address.number).toBe(1)
        expect(response.body.address.zip).toBe('123')
        expect(response.body.address.city).toBe('SP')
        expect(response.body.address.country).toBe('BR')
    })

    it('should not create a customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John',
            })

        expect(response.status).toBe(500)
    })

    it('should list all customer', async () => {
        const response = await request(app)
            .post('/customer')
            .send({
                name: 'John',
                address: {
                    street: 'Street',
                    number: 1,
                    zip: '123',
                    city: 'SP',
                    country: 'BR',
                }
            })

        expect(response.status).toBe(200)

        const response2 = await request(app)
            .post('/customer')
            .send({
                name: 'Jane',
                address: {
                    street: 'Street',
                    number: 1,
                    zip: '1234',
                    city: 'SP',
                    country: 'BR',
                }
            })

        expect(response2.status).toBe(200)

        const response3 = await request(app)
            .get('/customer')
            .send()

        expect(response3.status).toBe(200)
        expect(response3.body.customers.length).toBe(2)

        const customer = response3.body.customers[0]
        expect(customer.name).toEqual('John')
        expect(customer.address.zip).toEqual('123')

        const customer2 = response3.body.customers[1]
        expect(customer2.name).toEqual('Jane')
        expect(customer2.address.zip).toEqual('1234')
    })

    it('should list all customers in xml', async () => {
        const response = await request(app)
        .post('/customer')
        .send({
            name: 'John',
            address: {
                street: 'Street',
                number: 1,
                zip: '123',
                city: 'SP',
                country: 'BR',
            }
        })

        expect(response.status).toBe(200)

        const responseXml = await request(app)
        .get('/customer')
        .set('Accept', 'application/xml')
        .send()

        expect(responseXml.status).toBe(200)
        expect(responseXml.text).toContain('<?xml version="1.0" encoding="UTF-8"?>')
        expect(responseXml.text).toContain('<customers>')
        expect(responseXml.text).toContain('<customer>')
    })
})
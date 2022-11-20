import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";

describe('Customer repository test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a customer', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Name 1')
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address.street,
            number: address.number,
            zip: address.zip,
            city: address.city,
            country: address.country,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        })
    })

    it('should update a customer', async () => {
        const customerRepository = new CustomerRepository()
        const address1 = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        const customer = new Customer('1', 'Name 1')
        customer.changeAddress(address1)

        await customerRepository.create(customer)

        customer.changeName('Name 2')
        const address2 = new Address('Street 2', 2, 'zip 2', 'City 2', 'BR')
        customer.changeAddress(address2)
        await customerRepository.update(customer)

        const customerModel = await CustomerModel.findOne({ where: { id: '1' } })

        expect(customerModel.toJSON()).toStrictEqual({
            id: customer.id,
            name: customer.name,
            street: address2.street,
            number: address2.number,
            zip: address2.zip,
            city: address2.city,
            country: address2.country,
            active: customer.isActive(),
            rewardPoints: customer.rewardPoints,
        })
    })

    it('should find a customer', async () => {
        const customerRepository = new CustomerRepository()
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        const customer = new Customer('1', 'Name 1')
        customer.changeAddress(address)

        await customerRepository.create(customer)

        const customerModel = await customerRepository.find('1')

        expect(customer).toStrictEqual(customerModel)
    })

    it('should throw an error when customer is not found', async () => {
        const customerRepository = new CustomerRepository()

        expect(async () => {
            await customerRepository.find('123')
        }).rejects.toThrow('Customer not found')
    })

    it('should find all a customer', async () => {
        const customerRepository = new CustomerRepository()

        const customer1 = new Customer('1', 'Name 1')
        const address1 = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer1.changeAddress(address1)
        customer1.addRewardPoints(10)

        const customer2 = new Customer('2', 'Name 2')
        const address2 = new Address('Street 2', 2, 'zip 2', 'City 2', 'BR')
        customer2.changeAddress(address2)
        customer2.addRewardPoints(20)

        await customerRepository.create(customer1)
        await customerRepository.create(customer2)

        const customers = await customerRepository.findAll()

        expect(customers).toHaveLength(2)
        expect(customers).toContainEqual(customer1)
        expect(customers).toContainEqual(customer2)
    })
})
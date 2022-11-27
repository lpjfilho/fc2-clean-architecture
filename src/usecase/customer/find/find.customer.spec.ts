import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([CustomerModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should find a customer', async () => {
        const customer = new Customer('123', 'Name')
        const address = new Address('Rua A', 1, '123', 'SP', 'BR')
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)

        const input = {
            id: '123'
        }

        const output = {
            id: '123',
            name: 'Name',
            address: {
                street: 'Rua A',
                num: 1,
                zip: '123',
                city: 'SP',
                country: 'BR',
            }
        }

        const useCase = new FindCustomerUseCase(customerRepository)
        const result = await useCase.execute(input)

        expect(result).toMatchObject(output)
    })
})
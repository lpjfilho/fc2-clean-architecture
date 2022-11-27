import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../infrastructure/customer/repository/sequelize/customer.repository";
import Customer from "../../../domain/customer/entity/customer";
import Address from "../../../domain/customer/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('123', 'Name')
const address = new Address('Rua A', 1, '123', 'SP', 'BR')
customer.changeAddress(address)

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Test find customer use case', () => {
    it('should find a customer', async () => {
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

        const customerRepository = MockRepository()

        const useCase = new FindCustomerUseCase(customerRepository)
        const result = await useCase.execute(input)

        expect(result).toMatchObject(output)
    })

    it('should not find a customer', async () => {
        const input = {
            id: '123'
        }

        const customerRepository = MockRepository()
        customerRepository.find.mockImplementation(() => {
          throw new Error('Customer not found')
        })

        const useCase = new FindCustomerUseCase(customerRepository)

        await expect(() => {
            return useCase.execute(input)
        }).rejects.toThrow('Customer not found')
    })
})
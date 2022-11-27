import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress(
    'Name 1',
    new Address(
        'Street 1',
        1,
        'Zip 1',
        'SP',
        'BR'
    )
)

const customer2 = CustomerFactory.createWithAddress(
    'Name 2',
    new Address(
        'Street 2',
        2,
        'Zip 2',
        'SP',
        'BR'
    )
)

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test customer list use case', () => {
    it('should list all customers', async () => {
        const useCase = new ListCustomerUseCase(MockRepository())
        const output = await useCase.execute()

        expect(output.customers.length).toBe(2)

        expect(output.customers[0].id).toEqual(customer1.id)
        expect(output.customers[0].name).toEqual(customer1.name)
        expect(output.customers[0].address.street).toEqual(customer1.address.street)

        expect(output.customers[1].id).toEqual(customer2.id)
        expect(output.customers[1].name).toEqual(customer2.name)
        expect(output.customers[1].address.street).toEqual(customer2.address.street)
    })
})
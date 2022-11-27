import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress(
    'Name',
    new Address(
        'Rua A',
        1,
        '123',
        'SP',
        'BR'
    )
)

const input = {
    id: customer.id,
    name: 'John',
    address: {
        street: 'Street',
        number: 123,
        zip: 'Zip',
        city: 'City',
        country: 'Country',
    }
}

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test customer update use case', () => {
   it('should update customer', async () => {
       const customerUpdateUseCase = new UpdateCustomerUseCase(MockRepository())

       const output = await customerUpdateUseCase.execute(input)

       expect(output).toEqual(input)
   })
})
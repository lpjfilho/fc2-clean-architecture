import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
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
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create customer use case', () => {
    it('should create a customer', async () => {
        const customerCreateUseCase = new CreateCustomerUseCase(MockRepository())

        const output = await customerCreateUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
                country: input.address.country,
            }
        })
    })

    it('should throw an error when name is missing', async () => {
        const customerCreateUseCase = new CreateCustomerUseCase(MockRepository())

        input.name = ""

        await expect(customerCreateUseCase.execute(input))
            .rejects.toThrow('Name is required')
    })

    it('should throw an error when address is missing', async () => {
        const customerCreateUseCase = new CreateCustomerUseCase(MockRepository())

        input.address.street = ""

        await expect(customerCreateUseCase.execute(input))
            .rejects.toThrow('Street is required')
    })
})
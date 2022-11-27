import CreateProductUseCase from "./create.product.usecase";

const MockRepository = () => {
    return {
        create: jest.fn().mockReturnValue(Promise.resolve({id: '1', name: 'Product 1', price: 20})),
        find: jest.fn(),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test create product use case', () => {
    it('should test create product', async () => {
        const input = {
            name: 'Product 1',
            price: 20
        }

        const createProductUseCase = new CreateProductUseCase(MockRepository())
        const output = await createProductUseCase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        })
    })

    it('should throw error when name is missing', async () => {
        const input = {
            name: '',
            price: 20
        }

        const createProductUseCase = new CreateProductUseCase(MockRepository())
        await expect(createProductUseCase.execute(input))
            .rejects.toThrow('Name is required')
    })

    it('should throw error when price is less zero', async () => {
        const input = {
            name: 'Product 1',
            price: -1
        }

        const createProductUseCase = new CreateProductUseCase(MockRepository())
        await expect(createProductUseCase.execute(input))
            .rejects.toThrow('Price must be greater than zero')
    })
})
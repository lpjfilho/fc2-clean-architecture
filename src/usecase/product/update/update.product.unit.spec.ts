import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create('A', 'Product 1', 10)

const input = {
    id: product.id,
    name: 'Updated',
    price: 20,
}

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn().mockReturnValue(Promise.resolve(input)),
    }
}

describe('Unit test update product use case', () => {
    it('should update a product', async () => {
        const updateProductUseCase = new UpdateProductUseCase(MockRepository())
        const output = await updateProductUseCase.execute(input)

        expect(output).toEqual(input)
    })
})
import ProductFactory from "../../../domain/product/factory/product.factory";
import FindProductUseCase from "./find.product.usecase";

const product = ProductFactory.create('A', 'Product 1', 10.)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        update: jest.fn(),
    }
}

describe('Unit test find product use case', () => {
    it('should find a product', async () => {
        const input = {
            id: product.id
        }

        const findProductUseCase = new FindProductUseCase(MockRepository())
        const output = await findProductUseCase.execute(input)

        expect(output).toEqual({
            id: product.id,
            name: product.name,
            price: product.price,
        })
    })
})
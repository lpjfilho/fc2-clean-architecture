import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.create('A', 'Product 1', 10.)
const product2 = ProductFactory.create('A', 'Product 2', 20.)

const MockRepository = () => {
    return {
        create: jest.fn(),
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([product1, product2])),
        update: jest.fn(),
    }
}

describe('Unit test list product use case', () => {
    it('should list all products', async () => {
        const listProductUseCase = new ListProductUseCase(MockRepository())
        const output = await listProductUseCase.execute()

        expect(output.products).toHaveLength(2)

        expect(output.products[0].name).toEqual(product1.name)
        expect(output.products[0].price).toEqual(product1.price)

        expect(output.products[1].name).toEqual(product2.name)
        expect(output.products[1].price).toEqual(product2.price)
    })
})
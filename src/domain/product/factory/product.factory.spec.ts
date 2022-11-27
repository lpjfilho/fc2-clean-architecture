import ProductFactory from "./product.factory";

describe('Product factory unit test', () => {

    it('should create a product type A', () => {
        const product = ProductFactory.create('A', 'Product A', 10)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product A')
        expect(product.price).toBe(10)
        expect(product.constructor.name).toBe('Product')
    })

    it('should create a product type B', () => {
        const product = ProductFactory.create('B', 'Product B', 20)

        expect(product.id).toBeDefined()
        expect(product.name).toBe('Product B')
        expect(product.price).toBe(40)
        expect(product.constructor.name).toBe('ProductB')
    })

    it('should throw an error when product type is not supported', () => {
        expect(() => ProductFactory.create('C', 'Product C', 30))
            .toThrowError('Product type not supported')
    })
})
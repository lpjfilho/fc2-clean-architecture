import Product from "./product";

describe('Product unit test', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const product = new Product(" ", 'Name', 100)
        }).toThrowError('Product: Id is required')
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            const product = new Product('1', ' ', 100)
        }).toThrowError('Product: Name is required')
    })

    it('should throw error when price is less then zero', () => {
        expect(() => {
            const product = new Product('1', 'Name', -1)
        }).toThrowError('Product: Price must be greater than zero')
    })

    it('should change name', () => {
        const product = new Product('1', 'Name', 10)
        product.changeName('Name2')
        expect(product.name).toBe('Name2')
    })

    it('should change price', () => {
        const product = new Product('1', 'Name', 10)
        product.changePrice(20)
        expect(product.price).toBe(20)
    })
})
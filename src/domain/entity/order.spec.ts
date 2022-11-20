import Order from "./order";
import OrderItem from "./order_item";

describe('Order unit test', () => {
    it('should throw error when id is emtpy', () => {
        expect(() => {
            const order = new Order(" ", "1", [])
        }).toThrowError('Id is required')
    })

    it('should throw error when customerId is empty', () => {
        expect(() => {
            const order = new Order("1", " ", [])
        }).toThrowError('CustomerId is required')
    })

    it('should throw error when items is empty', () => {
        expect(() => {
            const order = new Order("1", "1", [])
        }).toThrowError('Items are required')
    })

    it('should calculate total', () => {
        const item1 = new OrderItem('1', '1', 'Item1', 10, 2)
        const item2 = new OrderItem('2', '2', 'Item2', 10, 2)
        const order = new Order("1", "1", [item1, item2])

        expect(order.total()).toBe(40)
    })

    it('should throw error if the item quantity is les or equal 0', () => {
        expect(() => {
            const item = new OrderItem('1', '1', 'Item1', 10, 0)
            const order = new Order("1", "1", [item])
        }).toThrowError('Quantity must be greater than zero')
    })
})
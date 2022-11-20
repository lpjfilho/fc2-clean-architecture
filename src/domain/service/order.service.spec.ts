import OrderItem from "../entity/order_item";
import Order from "../entity/order";
import OrderService from "./order.service";
import Customer from "../entity/customer";

describe('Order service unit test', () => {
    it('should get total of all orders', () => {
        const item1 = new OrderItem('1', '1', 'Name1', 10, 2)
        const item2 = new OrderItem('2', '2', 'Name2', 20, 2)

        const order1 = new Order('1', '1', [item1])
        const order2 = new Order('2', '2', [item2])

        const total = OrderService.total([order1, order2])
        expect(total).toBe(60)
    })

    it('should place an order', () => {
        const customer = new Customer('1', 'Name')
        const item = new OrderItem('1', '1', 'Name', 10, 2)

        const order = OrderService.placeOrder(customer, [item])

        expect(customer.rewardPoints).toBe(10)
        expect(order.total()).toBe(20)
    })

    it('should add reward points', () => {
        const customer = new Customer('1', 'Name')
        expect(customer.rewardPoints).toBe(0)

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10)

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20)
    })
})
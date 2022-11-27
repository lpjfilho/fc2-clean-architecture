import {Sequelize} from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import OrderModel from "./order.model";
import OrderItemModel from "./order-item.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Product from "../../../../domain/product/entity/product";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Order from "../../../../domain/checkout/entity/order";

describe('Order repository test', () => {

    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        await sequelize.addModels([CustomerModel, OrderItemModel, OrderModel, ProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create a order', async () => {
        const customerRepository = new CustomerRepository()
        const customer = new Customer('1', 'Name 1')
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer.changeAddress(address)
        await customerRepository.create(customer)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)

        const orderItem1 = new OrderItem('1', product.id, product.name, product.price, 1)
        const orderItem2 = new OrderItem('2', product.id, product.name, product.price, 2)

        const order = new Order('1', '1', [orderItem1, orderItem2])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'], })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    product_id: orderItem1.productId,
                    order_id: order.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity
                },
                {
                    id: orderItem2.id,
                    product_id: orderItem2.productId,
                    order_id: order.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity
                },
            ]
        })
    })

    it('should update a order', async () => {
        const customer = new Customer('1', 'Name 1')
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer.changeAddress(address)

        const customer2 = new Customer('2', 'Name 2')
        const address2 = new Address('Street 2', 2, 'zip 2', 'City 2', 'BR')
        customer2.changeAddress(address2)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)
        await customerRepository.create(customer2)

        const productRepository = new ProductRepository()
        const product = new Product('1', 'Product 1', 10)
        await productRepository.create(product)

        const orderItem1 = new OrderItem('1', product.id, product.name, product.price, 1)
        const orderItem2 = new OrderItem('2', product.id, product.name, product.price, 2)

        const order = new Order('1', '1', [orderItem1, orderItem2])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        order.changeCustomer(customer2.id)

        await orderRepository.update(order)

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ['items'], })

        expect(orderModel.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: '2',
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    product_id: orderItem1.productId,
                    order_id: order.id,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity
                },
                {
                    id: orderItem2.id,
                    product_id: orderItem2.productId,
                    order_id: order.id,
                    name: orderItem2.name,
                    price: orderItem2.price,
                    quantity: orderItem2.quantity
                },
            ]
        })
    })

    it('should find a order', async () => {
        const customer = new Customer('1', 'Name 1')
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)

        const product = new Product('1', 'Product 1', 10)

        const productRepository = new ProductRepository()
        await productRepository.create(product)

        const orderItem1 = new OrderItem('1', product.id, product.name, product.price, 1)

        const order = new Order('1', customer.id, [orderItem1])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const orderModel = await orderRepository.find(order.id)

        expect(order).toStrictEqual(orderModel)
    })

    it('should find all a order', async () => {
        const customer = new Customer('1', 'Name 1')
        const address = new Address('Street 1', 1, 'zip 1', 'City 1', 'BR')
        customer.changeAddress(address)

        const customerRepository = new CustomerRepository()
        await customerRepository.create(customer)

        const product = new Product('1', 'Product 1', 10)

        const productRepository = new ProductRepository()
        await productRepository.create(product)

        const orderItem1 = new OrderItem('1', product.id, product.name, product.price, 1)
        const orderItem2 = new OrderItem('2', product.id, product.name, product.price, 1)

        const order = new Order('1', customer.id, [orderItem1, orderItem2])

        const orderRepository = new OrderRepository()
        await orderRepository.create(order)

        const ordersModel = await orderRepository.findAll()

        expect([order]).toEqual(ordersModel)
        expect(order.customerId).toEqual(ordersModel[0].customerId)
        expect(ordersModel[0].items).toHaveLength(2)
        expect(ordersModel[0].items).toContainEqual(orderItem1)
        expect(ordersModel[0].items).toContainEqual(orderItem2)
    })
})
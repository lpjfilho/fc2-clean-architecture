import OrderRepositoryInterface from "../../domain/repository/order.repository.interface";
import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create(
            {
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => (
                    {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    }
                )),
            },
            {
                include: [{ model: OrderItemModel }]
            }
        )
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findOne({ where: { id }, rejectOnEmpty: true, include: [{ model: OrderItemModel }] })

        const orderItemsModel = orderModel.items.map((orderItemModel) => {
                return new OrderItem(
                    orderItemModel.id,
                    orderItemModel.product_id,
                    orderItemModel.name,
                    orderItemModel.price,
                    orderItemModel.quantity
                )
            })

        return new Order(orderModel.id, orderModel.customer_id, orderItemsModel)
    }

    async findAll(): Promise<Order[]> {
        const ordersModel = await OrderModel.findAll({ include: [{ model: OrderItemModel }] })

        return ordersModel.map((orderModel) => {
            const orderItemsModel = orderModel.items.map((orderItemModel) => {
                return new OrderItem(
                    orderItemModel.id,
                    orderItemModel.product_id,
                    orderItemModel.name,
                    orderItemModel.price,
                    orderItemModel.quantity
                )
            })

            return new Order(orderModel.id, orderModel.customer_id, orderItemsModel)
        })
    }

    async update(entity: Order): Promise<void> {
        await OrderModel.update(
            {
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => (
                    {
                        id: item.id,
                        name: item.name,
                        price: item.price,
                        product_id: item.productId,
                        quantity: item.quantity,
                    }
                )),
            },
            {
                where: { id: entity.id },
            },
        )
    }
}
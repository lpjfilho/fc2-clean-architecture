import Order from "../entity/order";
import {v4 as uuid} from "uuid";
import {or} from "sequelize";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
    id: string,
    customerId: string,
    items: {
        id: string,
        name: string,
        productId: string,
        quantity: number,
        price: number,
    }[]
}

export default class OrderFactory {
    static create(props: OrderFactoryProps): Order {
        const orderItems = props.items.map((item) => {
            return new OrderItem(item.id, item.productId, item.name, item.price, item.quantity)
        })
        return new Order(props.id, props.customerId, orderItems)
    }
}
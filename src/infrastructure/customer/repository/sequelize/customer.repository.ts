import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "./customer.model";
import Address from "../../../../domain/customer/value-object/address";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            country: entity.address.country,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
        })
    }

    async find(id: string): Promise<Customer> {
        let customerModel

        try {
            customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true })
        } catch (error) {
            throw new Error('Customer not found')
        }

        const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.zip,
            customerModel.city,
            customerModel.country
        )

        const customer = new Customer(
            customerModel.id,
            customerModel.name,
        )
        customer.changeAddress(address)

        return customer
    }

    async findAll(): Promise<Customer[]> {
        const customersModel = await CustomerModel.findAll()
        return customersModel.map((customerModel) => {
                const customer = new Customer(customerModel.id, customerModel.name)
                customer.addRewardPoints(customerModel.rewardPoints)

                const address = new Address(
                    customerModel.street,
                    customerModel.number,
                    customerModel.zip,
                    customerModel.city,
                    customerModel.country
                )
                customer.changeAddress(address)

                if (customerModel.active) {
                    customer.activate()
                }

                return customer
            }
        )
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update(
            {
                name: entity.name,
                street: entity.address.street,
                number: entity.address.number,
                zip: entity.address.zip,
                city: entity.address.city,
                country: entity.address.country,
                active: entity.isActive(),
                rewardPoints: entity.rewardPoints,
            },
            {
                where: {
                    id: entity.id
                }
            }
        )
    }
}
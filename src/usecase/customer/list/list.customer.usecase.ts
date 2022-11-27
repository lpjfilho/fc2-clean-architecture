import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {OutputListCustomerDto} from "./list.customer.dto";

export default class ListCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository= customerRepository
    }

    async execute(): Promise<OutputListCustomerDto> {
        const customers = await this.customerRepository.findAll()

        return {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        number: customer.address.number,
                        zip: customer.address.zip,
                        city: customer.address.city,
                        country: customer.address.city,
                    }
                }
            })
        }
    }
}
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import InputUpdateCustomerDto from "./update.customer.dto";
import OutputUpdateCustomerDto from "./update.customer.dto";
import Address from "../../../domain/customer/value-object/address";

export default class UpdateCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputUpdateCustomerDto): Promise<OutputUpdateCustomerDto> {
        const customer = await this.customerRepository.find(input.id)
        customer.changeName(input.name)
        customer.changeAddress(
            new Address(
                input.address.street,
                input.address.number,
                input.address.zip,
                input.address.city,
                input.address.country,
            )
        )

        await this.customerRepository.update(customer)

        return {
            id: input.id,
            name: input.name,
            address: {
                street: input.address.street,
                number: input.address.number,
                zip: input.address.zip,
                city: input.address.city,
                country: input.address.country,
            }
        }
    }
}
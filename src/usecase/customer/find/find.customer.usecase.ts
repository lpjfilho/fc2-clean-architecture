import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import {InputFindCustomerDto, OutputCustomerDto} from "./find.customer.dto";

export default class FindCustomerUseCase {
    private customerRepository: CustomerRepositoryInterface

    constructor(customerRepository: CustomerRepositoryInterface) {
        this.customerRepository = customerRepository
    }

    async execute(input: InputFindCustomerDto): Promise<OutputCustomerDto> {
        const customer = await this.customerRepository.find(input.id)

        return {
            id: customer.id,
            name: customer.name,
            address: {
                street: customer.address.street,
                num: customer.address.number,
                zip: customer.address.zip,
                city: customer.address.city,
                country: customer.address.country,
            }
        }
    }
}
type Customer = {
    id: string
    name: string,
    address: {
        street: string
        number: number
        zip: string
        city: string
        country: string
    }
}

export interface OutputListCustomerDto {
    customers: Customer[]
}
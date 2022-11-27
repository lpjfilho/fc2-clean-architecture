export interface InputFindCustomerDto {
    id: string
}

export interface OutputCustomerDto {
    id: string
    name: string,
    address: {
        street: string
        num: number
        zip: string,
        city: string
        country: string
    }
}

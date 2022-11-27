import CustomerFactory from "./customer.factory";
import Address from "../value-object/address";

describe('Customer factory unit test', () => {

    it('should create a customer', () => {
        const customer = CustomerFactory.create('John')

        expect(customer.constructor.name).toBe('Customer')
        expect(customer.name).toBe('John')
        expect(customer.address).toBeUndefined()
    });

    it('should create a customer with an address', () => {
        const address = new Address('Rua a', 1, '123', 'SP', 'BR')
        const customer = CustomerFactory.createWithAddress('John', address)

        expect(customer.constructor.name).toBe('Customer')
        expect(customer.name).toBe('John')
        expect(customer.address).toBe(address)

    })
})
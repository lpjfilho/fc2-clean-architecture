import Customer from "./customer";
import Address from "../value-object/address";

describe('Customer unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            const customer = new Customer('', 'Name')
        }).toThrowError('Customer: Id is required')
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            const customer = new Customer('1', ' ')
        }).toThrowError('Customer: Name is required')
    })

    it('should throw error when id and name are empty', () => {
        expect(() => {
            const customer = new Customer(' ', ' ')
        }).toThrowError('Customer: Id is required, Customer: Name is required')
    })

    it('should change name', () => {
        const customer = new Customer('1', 'Name')
        customer.changeName('Name2')
        expect(customer.name).toBe('Name2')
    })

    it('should throw error when address is undefined', () => {
        expect(() => {
            const customer = new Customer('1', 'Name')
            customer.activate()
        }).toThrowError('Address is mandatory to activate a customer')
    })

    it('should activate customer', () => {
        const customer = new Customer('1', 'Name')
        const address = new Address('Street', 123, '151222', 'SP', 'BR')
        customer.changeAddress(address)
        customer.activate()
        expect(customer.isActive()).toBe(true)
    })

    it('should deactivate customer', () => {
        const customer = new Customer('1', 'Name')
        customer.deactivate()
        expect(customer.isActive()).toBe(false)
    })
})
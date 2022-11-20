import EventDispatcher from "./event-dispatcher";
import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EnviaConsoleLog1Handler from "../customer/handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "../customer/handler/envia-console-log2.handler";
import CustomerCreatedEvent from "../customer/customer-created";
import CustomerAddressChangedEvent from "../customer/customer-address-changed.event";
import EnviaConsoleLogHandler from "../customer/handler/envia-console-log.handler";

describe('Domain events tests', () => {

    it('should register an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1)
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)
    })

    it('should unregister an event handler', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

        eventDispatcher.unregister('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined()
        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0)
    })

    it('should unregister all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

        eventDispatcher.unregisterAll()

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeUndefined()
    })

    it('should notify all event handlers', () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        eventDispatcher.register('ProductCreatedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.ProductCreatedEvent[0]).toMatchObject(eventHandler)

        const productCreatedEvent = new ProductCreatedEvent({
            name: 'Product 1',
            description: 'Description 1',
            price: 10.0,
        })

        eventDispatcher.notify(productCreatedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })

    it('should notify all event customer handlers', () => {
        const eventDispatcher = new EventDispatcher()
        const event1Handler = new EnviaConsoleLog1Handler()
        const event2Handler = new EnviaConsoleLog2Handler()

        const spyEvent1Handler = jest.spyOn(event1Handler, 'handle')
        const spyEvent2Handler = jest.spyOn(event2Handler, 'handle')

        eventDispatcher.register('CustomerCreatedEvent', event1Handler)
        eventDispatcher.register('CustomerCreatedEvent', event2Handler)

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: 'Customer name',
        })
        eventDispatcher.notify(customerCreatedEvent)

        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(2)
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[0]).toMatchObject(event1Handler)
        expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent[1]).toMatchObject(event2Handler)
        expect(spyEvent1Handler).toHaveBeenCalled()
        expect(spyEvent2Handler).toHaveBeenCalled()
    })

    it('should notify all event when customer address is updated', () => {
        const eventDispatcher = new EventDispatcher()
        const eventHandler = new EnviaConsoleLogHandler()

        const spyEventHandler = jest.spyOn(eventHandler, 'handle')

        eventDispatcher.register('CustomerAddressChangedEvent', eventHandler)

        expect(eventDispatcher.getEventHandlers.CustomerAddressChangedEvent[0]).toMatchObject(eventHandler)

        const customerAddressChangedEvent = new CustomerAddressChangedEvent({
            id: '1',
            nome: 'Name 1',
            endereco: 'Rua A',
        })

        eventDispatcher.notify(customerAddressChangedEvent)

        expect(spyEventHandler).toHaveBeenCalled()
    })
})
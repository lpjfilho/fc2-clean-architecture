import Notification from "./notification";

describe('Unit test for notifications', () => {

    it('should create an errors', () => {
        const notification = new Notification()

        const error = {
            context: 'customer',
            message: 'error message',
        }
        notification.add(error)

        expect(notification.messages('customer')).toBe('customer: error message')

        const error2 = {
            context: 'customer',
            message: 'error message 2',
        }
        notification.add(error2)

        expect(notification.messages('customer')).toBe('customer: error message, customer: error message 2')

        const error3 = {
            context: 'order',
            message: 'error message 3',
        }
        notification.add(error3)

        expect(notification.messages('order')).toBe('order: error message 3')

        expect(notification.messages())
            .toBe('customer: error message, customer: error message 2, order: error message 3')
    })

    it('should check it notification has at least one error', () => {
        const notification = new Notification()

        expect(notification.hasErrors()).toBe(false)

        const error = {
            context: 'customer',
            message: 'error message',
        }
        notification.add(error)

        expect(notification.hasErrors()).toBe(true)
    })

    it('should get all erros props', () => {
        const notification = new Notification()
        const error = {
            context: 'customer',
            message: 'error message',
        }
        notification.add(error)

        expect(notification.getErrors()).toEqual([error])
    })
})
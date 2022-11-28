import {NotificationType} from "./notification";

export default class NotificationError extends Error {
    constructor(public errors: NotificationType[]) {
        super(errors.map((error) => `${error.context}: ${error.message}`).join(', '));
    }
}
import EventInterface from "../../@shared/event/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
    data: any;
    dateTimeOccurred: Date;

    constructor(data: any) {
        this.data = data
        this.dateTimeOccurred = new Date()
    }
}
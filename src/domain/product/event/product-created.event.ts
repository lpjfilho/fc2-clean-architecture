import EventInterface from "../../@shared/event/event.interface";

export default class ProductCreatedEvent implements EventInterface {
    dateTimeOccurred: Date;
    data: any;

    constructor(data: any) {
        this.dateTimeOccurred = new Date()
        this.data = data
    }
}
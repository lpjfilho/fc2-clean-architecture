import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
    data: any;
    dateTimeOccurred: Date;

    constructor(data: any) {
        this.data = data
        this.dateTimeOccurred = new Date()
    }
}
import Entity from "../../@shared/entity/entity.abstract";
import Address from "../value-object/address";
import NotificationError from "../../@shared/notification/notification.error";

export default class Customer extends Entity {
    private _name: string
    private _address!: Address
    private _active: boolean = false
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super()

        this._id = id
        this._name = name

        this.validate()

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    validate() {
        if (this._id.trim().length === 0) {
            this.notification.add({
                context: this.constructor.name,
                message: 'Id is required',
            })
        }
        if (this._name.trim().length === 0) {
            this.notification.add({
                context: this.constructor.name,
                message: 'Name is required',
            })
        }
    }

    get name(): string {
        return this._name
    }

    get address(): Address {
        return this._address
    }

    get rewardPoints(): number {
        return this._rewardPoints
    }

    isActive(): boolean {
        return this._active
    }

    changeName(name: string) {
        this._name = name
        this.validate()
    }

    changeAddress(address: Address) {
        this._address = address
    }

    activate() {
        if (this._address === undefined) {
            throw new Error('Address is mandatory to activate a customer')
        }
        this._active = true
    }

    deactivate() {
        this._active = false
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points
    }
}
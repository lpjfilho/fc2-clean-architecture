export default class Address {
    private _street: string
    private _number: number
    private _zip: string
    private _city: string
    private _country: string

    constructor(street: string, num: number, zip: string, city: string, country: string) {
        this._street = street
        this._number = num
        this._zip = zip
        this._city = city
        this._country = country

        this.validate()
    }

    validate() {
        if (this._street.trim().length === 0) {
            throw new Error('Street is required')
        }
        if (this._number === 0) {
            throw new Error('Number is required')
        }
        if (this._zip.trim().length === 0) {
            throw new Error('Zip is required')
        }
        if (this._city.trim().length === 0) {
            throw new Error('City is required')
        }
        if (this._country.trim().length === 0) {
            throw new Error('Country is required')
        }
    }

    get street(): string {
        return this._street
    }

    get number(): number {
        return this._number
    }

    get zip(): string {
        return this._zip
    }

    get city(): string {
        return this._city
    }

    get country(): string {
        return this._country
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city} - ${this._country}`
    }
}
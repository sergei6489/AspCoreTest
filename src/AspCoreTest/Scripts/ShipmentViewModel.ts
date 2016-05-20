export class Shipment {
    constructor(
        public id: number,
        public from: string,
        public To: string,
        public dateTimeOut: any,
        public dateTimeInput: any,
        public places: Array<number>,
        public price: number)
    { }
}

export class Direction {
    constructor(
        public from: string,
        public to: string
    )
    { }
}
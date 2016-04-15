export class Shipment {
    constructor(
        public Id: number,
        public From: string,
        public To: string,
        public DateTime: any,
        public Price: number)
    { }
}

export class Direction {
    constructor(
        public From: string,
        public To: string
    )
    { }
}
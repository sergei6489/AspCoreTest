export class Shipment {
    constructor(
        public id: number,
        public From: string,
        public To: string,
        public DateTime: any,
        public price: number)
    { }
}
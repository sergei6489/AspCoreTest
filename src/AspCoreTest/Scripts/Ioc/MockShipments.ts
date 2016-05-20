import { Shipment,Direction } from "../ShipmentViewModel";
export var MockShipments: Array<Shipment> = [
    new Shipment(1, "Barcelona", "Moscow", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Madrid", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Minsk", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Moscow", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Madrid", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Moscow", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555),
    new Shipment(1, "Barcelona", "Madrid", new Date(), new Date(), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 4555)
];
export var MockDirections: Array<Direction> = [
    new Direction("Barcelona", "Moscow"),
    new Direction("Barcelona", "Madrid"),
    new Direction("Barcelona", "Minsk")
];
export var MockDirectionString: Array<string> = [
    "Barcelona", "Moscow", "Madrid", "Minsk","",null
];
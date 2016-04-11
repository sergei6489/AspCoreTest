"use strict";
var Shipment = (function () {
    function Shipment(Id, From, To, DateTime, Price) {
        this.Id = Id;
        this.From = From;
        this.To = To;
        this.DateTime = DateTime;
        this.Price = Price;
    }
    return Shipment;
}());
exports.Shipment = Shipment;
var Direction = (function () {
    function Direction(From, To) {
        this.From = From;
        this.To = To;
    }
    return Direction;
}());
exports.Direction = Direction;
//# sourceMappingURL=Shipment.js.map
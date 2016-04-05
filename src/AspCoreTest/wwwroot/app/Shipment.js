var Shipment = (function () {
    function Shipment(id, From, To, DateTime, price) {
        this.id = id;
        this.From = From;
        this.To = To;
        this.DateTime = DateTime;
        this.price = price;
    }
    return Shipment;
})();
exports.Shipment = Shipment;

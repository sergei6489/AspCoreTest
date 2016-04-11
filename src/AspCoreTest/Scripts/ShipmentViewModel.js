System.register([], function(exports_1) {
    var Shipment;
    return {
        setters:[],
        execute: function() {
            Shipment = (function () {
                function Shipment(id, From, To, DateTime, price) {
                    this.id = id;
                    this.From = From;
                    this.To = To;
                    this.DateTime = DateTime;
                    this.price = price;
                }
                return Shipment;
            })();
            exports_1("Shipment", Shipment);
        }
    }
});
//# sourceMappingURL=Shipment.js.map
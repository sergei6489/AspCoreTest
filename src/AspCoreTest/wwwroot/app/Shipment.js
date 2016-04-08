System.register([], function(exports_1) {
    var Shipment, Direction;
    return {
        setters:[],
        execute: function() {
            class Shipment {
                constructor(Id, From, To, DateTime, Price) {
                    this.Id = Id;
                    this.From = From;
                    this.To = To;
                    this.DateTime = DateTime;
                    this.Price = Price;
                }
            }
            Shipment = Shipment;
            class Direction {
                constructor(From, To) {
                    this.From = From;
                    this.To = To;
                }
            }
            Direction = Direction;
        }
    }
});
//# sourceMappingURL=Shipment.js.map
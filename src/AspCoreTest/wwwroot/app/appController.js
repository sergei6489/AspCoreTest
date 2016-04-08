System.register(['angular2/platform/browser', 'angular2/core', 'angular2/http', './Shipment', 'rxjs/add/operator/map'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var browser_1, core_1, http_1, Shipment_1, Shipment_2;
    var AppComponent;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Shipment_1_1) {
                Shipment_1 = Shipment_1_1;
                Shipment_2 = Shipment_1_1;
            },
            function (_1) {}],
        execute: function() {
            let AppComponent = class {
                constructor(http) {
                    this.http = http;
                    this.shipments = [];
                    this.directions = [];
                    this.pageIndex = 1;
                    this.getData();
                }
                getData() {
                    $.getJSON('http://localhost:4163/api/shipments/', (data) => {
                        alert('данные загружены');
                    });
                    /*
                        this.http.get('http://localhost:4163/api/shipments/').map(res=>
                            res.json()
                        ).map((shipments: Array<any>) => {
                            let result: Array<Shipment> = [];
                            shipments.forEach(elem=> {
                                result.push(new Shipment(elem.Id, elem.From, elem.To, elem.DateTime, elem.Price));
                            });
                        }).subscribe();
                        */
                    let result = [];
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Madrid", new Date(), 4555));
                    result.push(new Shipment_1.Shipment(1, "Barcelona", "Minsk", new Date(), 4555));
                    this.shipments = result;
                    let direct = [];
                    direct.push(new Shipment_2.Direction("Barcelona", "Moscow"));
                    direct.push(new Shipment_2.Direction("Barcelona", "Minsk"));
                    direct.push(new Shipment_2.Direction("Barcelona", "Madrid"));
                    this.directions = direct;
                }
                GetNextPage() {
                    this.pageIndex++;
                    this.getData();
                }
                ShowInfo(shipment) {
                }
            };
            AppComponent = __decorate([
                core_1.Component({
                    selector: "testProject",
                    templateUrl: "app/partials/Main.html"
                }), 
                __metadata('design:paramtypes', [http_1.Http])
            ], AppComponent);
            browser_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS]);
        }
    }
});
//# sourceMappingURL=appController.js.map
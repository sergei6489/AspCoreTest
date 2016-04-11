"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
///<reference path="./typings/jquery/jquery.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
var browser_1 = require('angular2/platform/browser');
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
var Shipment_1 = require('./Shipment');
var Shipment_2 = require('./Shipment');
require('rxjs/add/operator/map');
var AppComponent = (function () {
    function AppComponent(http) {
        this.http = http;
        this.shipments = [];
        this.directions = [];
        this.pageIndex = 1;
        this.getData();
    }
    AppComponent.prototype.getData = function () {
        $.getJSON('http://localhost:4163/api/shipments/', function (data) {
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
        var result = [];
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Madrid", new Date(), 4555));
        result.push(new Shipment_1.Shipment(1, "Barcelona", "Minsk", new Date(), 4555));
        this.shipments = result;
        var direct = [];
        direct.push(new Shipment_2.Direction("Barcelona", "Moscow"));
        direct.push(new Shipment_2.Direction("Barcelona", "Minsk"));
        direct.push(new Shipment_2.Direction("Barcelona", "Madrid"));
        this.directions = direct;
    };
    AppComponent.prototype.GetNextPage = function () {
        this.pageIndex++;
        this.getData();
    };
    AppComponent.prototype.ShowInfo = function (shipment) {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "testProject",
            templateUrl: "app/partials/Main.html"
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], AppComponent);
    return AppComponent;
}());
browser_1.bootstrap(AppComponent, [http_1.HTTP_PROVIDERS]);
//# sourceMappingURL=appController.js.map
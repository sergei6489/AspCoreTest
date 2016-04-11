///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import { Component } from 'angular2/core';
import { Http, HTTP_PROVIDERS, Response } from 'angular2/http';
import { Shipment } from './ShipmentViewModel';
import { Direction } from './ShipmentViewModel';
import 'rxjs/add/operator/map';

@Component({
    selector: "testProject",
    templateUrl: "app/partials/Main.html"
})

class AppComponent {
    shipments: Array<Shipment> = [];
    directions: Array<Direction> = [];
    pageIndex: number;
    constructor(public http: Http) {
        this.pageIndex = 1;
        this.getData();
      
    }

    getData()
    {

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
        let result: Array<Shipment> = [];
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Moscow", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Madrid", new Date(), 4555));
        result.push(new Shipment(1, "Barcelona", "Minsk", new Date(), 4555));
        this.shipments = result;
        let direct: Array<Direction> = [];
        direct.push(new Direction("Barcelona", "Moscow"));
        direct.push(new Direction("Barcelona", "Minsk"));
        direct.push(new Direction("Barcelona", "Madrid"));
        this.directions = direct;
    }

    GetNextPage() {
        this.pageIndex++;
        this.getData();
    }

    ShowInfo(shipment: Shipment) {
        
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
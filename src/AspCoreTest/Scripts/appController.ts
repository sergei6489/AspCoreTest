///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import {Component, ViewChild} from 'angular2/core';
import { Http, HTTP_PROVIDERS, Response } from 'angular2/http';
import { Shipment, Direction } from './ShipmentViewModel';
import {ShipmentDetail} from './Shipment-Details';
import {ShipmentEdit} from './Shipment-Edit';
import 'rxjs/add/operator/map';
import { MockDirections,MockShipments } from './Ioc/MockShipments';

@Component({
    selector: "testProject",
    templateUrl: "app/partials/Main.html",
    directives: [ShipmentDetail,ShipmentEdit]
})

class AppComponent {
    @ViewChild("shipmentDetail") detail: ShipmentDetail;
    @ViewChild("shipmentEdit") edit: ShipmentEdit;
    shipments: Array<Shipment> = [];
    directions: Array<Direction> = [];
    selectedShipment: Shipment;
    pageIndex: number;
    
    constructor(public http: Http ) {
        this.pageIndex = 1;
        this.getData();
      
    }

    getData()
    {
        this.shipments = MockShipments;
        this.directions = MockDirections;
    }

    GetNextPage() {
        this.pageIndex++;
        this.getData();
    }

    // показать детальную информацию по маршруту
    ShowInfo(shipment: Shipment) {
        this.detail.OnShowDialog(shipment);
    }

    EditInfo(shipment: Shipment) {
        this.edit.OnShowDialog(shipment);
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import {Component, ViewChild} from 'angular2/core';
import { Http, HTTP_PROVIDERS, Response } from 'angular2/http';
import { Shipment, Direction } from './ShipmentViewModel';
import {ShipmentDetail} from './Shipment-Details';
import {ShipmentEdit} from './Shipment-Edit';
import {SearchControl} from './SearchControl';
import 'rxjs/add/operator/map';
import { MockDirections, MockShipments } from './Ioc/MockShipments';
import { ShipmentService } from "./ShipmentService";
import { SearchViewModel } from "./SearchViewModel";

@Component({
    selector: "testProject",
    providers: [ShipmentService, SearchViewModel],
    templateUrl: "app/partials/Main.html",
    directives: [ShipmentDetail,ShipmentEdit,SearchControl]
})

class AppComponent {
    @ViewChild("shipmentDetail") detail: ShipmentDetail;
    @ViewChild("shipmentEdit") edit: ShipmentEdit;
    shipments: Array<Shipment> = [];
    pageIndex: number;

    constructor(public http: Http, public service: ShipmentService, public search: SearchViewModel) {
        this.pageIndex = 1;
        this.getData();
    }

    getData()
    {
        this.shipments = MockShipments;
    }

    Search() {
        this.service.getShipments(1, 10, this.search);
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
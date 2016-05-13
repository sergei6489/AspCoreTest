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
import { PagerShipments } from "./PagerShipments"

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
    pageCount: number;

    constructor(public http: Http, public service: ShipmentService, public search: SearchViewModel) {
        this.pageIndex = 1;
        this.init();
    }

    init()
    {
        this.shipments = [];
        this.pageIndex = 1;
        this.pageCount = 0;
        this.Search();
    }

    Search() {
        var data: PagerShipments = this.service.getShipments(this.pageIndex, 10, this.search);
        this.shipments = data.Result;
        this.pageCount = data.PageCount;
    }
    previewPage() {
        if (this.pageIndex > 0 && this.pageIndex < this.pageCount - 1) {
            this.pageIndex--;
            this.Search();
        }
    }

    nextPage() {
        if (this.pageIndex < this.pageCount - 1) {
            this.pageIndex++;
            this.Search();
        }}

    // показать детальную информацию по маршруту
    ShowInfo(shipment: Shipment) {
        this.detail.OnShowDialog(shipment);
    }

    EditInfo(shipment: Shipment) {
        this.edit.OnShowDialog(shipment);
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
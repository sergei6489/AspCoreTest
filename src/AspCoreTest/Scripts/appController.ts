///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component, ViewChild, OnInit} from 'angular2/core';
import { Shipment, Direction } from './ShipmentViewModel';
import {ShipmentDetail} from './Shipment-Details';
import {ShipmentEdit} from './Shipment-Edit';
import {SearchControl} from './SearchControl';
import { MockDirections, MockShipments } from './Ioc/MockShipments';
import { ShipmentService } from "./ShipmentService";
import { SearchViewModel } from "./SearchViewModel";
import { PagerShipments } from "./PagerShipments";
import { DateTimeControl } from "./DateTimeControl";

@Component({
    selector: "testProject",
    providers: [ShipmentService, SearchViewModel],
    templateUrl: "app/partials/Main.html",
    directives: [ShipmentDetail, ShipmentEdit, SearchControl, DateTimeControl]
})

export class AppComponent implements OnInit {
    @ViewChild("shipmentDetail") detail: ShipmentDetail;
    @ViewChild("shipmentEdit") edit: ShipmentEdit;
    shipments: Array<Shipment> = [];
    errorText: string;

    ngOnInit() {
        this.init();
    }

    constructor(public service: ShipmentService, public search: SearchViewModel) {

    }

    init() {
        this.shipments = [];
        this.search = new SearchViewModel();
        this.search.pageIndex = 1;
        this.search.pageCount = 0;
        this.search.highestPrice = 1000;
        this.search.smallestPrice = 10;
        this.search.itemCount = 8;
        this.search.departureDate = null;
        this.search.returnDate = null;
        this.Search();
    }

    Search() {
        this.service.getShipments(this.search).
            subscribe(res => {
                this.shipments = [];
                res.Result.forEach((data: Shipment) => {
                    this.shipments.push(new Shipment(data.id, data.from, data.to, new Date(data.dateTimeOut), new Date(data.dateTimeInput), data.places, data.price));
                });
                this.search.pageCount = res.PageCount;
            }, error => this.errorText = error);
    }
    previewPage() {
        if (this.search.pageIndex > 0 && this.search.pageIndex < this.search.pageCount - 1) {
            this.search.pageIndex--;
            this.Search();
        }
    }

    nextPage() {
        if (this.search.pageIndex < this.search.pageCount) {
            this.search.pageIndex++;
            this.Search();
        }
    }

    // показать детальную информацию по маршруту
    ShowInfo(shipment: Shipment) {
        this.detail.OnShowDialog(shipment);
    }

    EditInfo(shipment: Shipment) {
        this.edit.OnShowDialog(shipment);
    }
}
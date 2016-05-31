///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { bootstrap } from 'angular2/platform/browser';
import {Component, ViewChild, OnInit} from 'angular2/core';
import { Http, HTTP_PROVIDERS, Response } from 'angular2/http';
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

class AppComponent implements OnInit {
    @ViewChild("shipmentDetail") detail: ShipmentDetail;
    @ViewChild("shipmentEdit") edit: ShipmentEdit;
    shipments: Array<Shipment> = [];
    pageIndex: number;
    pageCount: number;
    errorText: string;


    ngOnInit(){
        this.pageIndex = 1;
        this.init();
    }

    constructor(public http: Http, public service: ShipmentService, public search: SearchViewModel) {
        
    }

    init()
    {
        this.shipments = [];
        this.pageIndex = 1;
        this.pageCount = 0;
        this.search = new SearchViewModel();
        this.search.highestPrice = 1000;
        this.search.smallestPrice = 10;
        this.search.departureDate = new Date();
        this.search.returnDate = new Date();
        this.Search();
    }

    Search() {
        this.service.getShipments(this.pageIndex, 10, this.search).
            subscribe(res => {
                this.shipments = [];
                res.Result.forEach((data: Shipment) => {
                    this.shipments.push(new Shipment(data.id, data.from, data.to, new Date(data.dateTimeOut), new Date(data.dateTimeInput), data.places, data.price));
                });
                this.pageCount = res.PageCount;
            }, error => this.errorText = error);
    }
    previewPage() {
        if (this.pageIndex > 0 && this.pageIndex < this.pageCount - 1) {
            this.pageIndex--;
            this.Search();
        }
    }

    nextPage() {
        if (this.pageIndex < this.pageCount ) {
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
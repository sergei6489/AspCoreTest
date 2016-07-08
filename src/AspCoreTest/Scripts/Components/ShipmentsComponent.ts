///<reference path="../typings/tsd.d.ts" />
import {ROUTER_DIRECTIVES} from "@angular/router";
import {Component, ViewChild, OnInit} from '@angular/core';
import { Shipment, Direction } from '../ViewModels/ShipmentViewModel';
import {ShipmentDetailComponent} from '../Components/shipmentDetailComponent';
import { ShipmentEditComponent } from '../Components/shipmentEditComponent';
import {SearchControl} from '../HelpControls/SearchControl';
import { ShipmentService } from "../Services/ShipmentService";
import { SearchViewModel } from "../ViewModels/SearchViewModel";
import { PagerShipmentsViewModel } from "../ViewModels/PagerShipmentsViewModel";
import { DateTimeControl } from "../HelpControls/DateTimeControl";
import { MdButton } from "@angular2-material/button"
import { MD_PROGRESS_CIRCLE_DIRECTIVES} from "@angular2-material/progress-circle";
import { MD_CHECKBOX_DIRECTIVES } from "@angular2-material/checkbox";

@Component({
    selector: "testProject",
    providers: [ShipmentService, SearchViewModel ],
    templateUrl: "app/partials/Main.html",
    directives: [MdButton, MD_CHECKBOX_DIRECTIVES, MD_PROGRESS_CIRCLE_DIRECTIVES, ShipmentDetailComponent, ShipmentEditComponent, SearchControl, DateTimeControl, ROUTER_DIRECTIVES]
})

export class ShipmentsComponent implements OnInit {
    @ViewChild("shipmentDetail") detail: ShipmentDetailComponent;
    @ViewChild("shipmentEdit") edit: ShipmentEditComponent;
    shipments: Array<Shipment> = [];
    errorText: string;
    isLoad: boolean;

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
        this.shipments = [];
        this.isLoad = true;
        var self = this;
        setTimeout(function () {
            self.service.getShipments(self.search).
                subscribe(res => {
                    res.Result.forEach((data: Shipment) => {
                        self.shipments.push(new Shipment(data.id, data.from, data.to, new Date(data.dateTimeOut), new Date(data.dateTimeInput), data.places, data.price));
                    });
                    self.search.pageCount = res.PageCount;
                    self.isLoad = false;
                }, error => { self.errorText = error; self.isLoad = false; });
        },2000);

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
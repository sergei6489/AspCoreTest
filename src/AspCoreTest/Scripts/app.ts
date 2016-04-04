import { bootstrap } from 'angular2/platform/browser';
import { Component, View } from 'angular2/core';
//import { NgFor } from 'angular2/common';
import { Http, HTTP_PROVIDERS, Response } from 'angular2/http';
import { Shipment } from './Shipment';
import 'rxjs/add/operator/map';

@Component({
    selector: "testProject",
    templateUrl: "app/partials/Shipments.html"
})

class AppComponents {
    shipments: Array<Shipment> = [];
    constructor(public http: Http) {

    }
    getData()
    {
        this.http.get('api/GetShipments/').map(res=> res.json()).map(
    }
}
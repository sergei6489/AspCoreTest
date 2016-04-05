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

class AppComponent {
    shipments: Array<Shipment> = [];
    pageIndex: number;
    constructor(public http: Http) {
        this.pageIndex = 1;
        this.getData();
    }
    getData()
    {
        this.http.get('http://localhost:4163/api/shipments/').map(res=>
            res.json()
        ).map((shipments: Array<any>) => {
            let result: Array<Shipment> = [];
            shipments.forEach(elem=> {
                result.push(new Shipment(elem.Id, elem.From, elem.To, elem.DateTime, elem.Price));
            });
        }).subscribe();
    }

    GetNextPage() {
        this.pageIndex++;
        this.getData();
    }
}

bootstrap(AppComponent, [HTTP_PROVIDERS]);
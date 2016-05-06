///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { Injectable } from "angular2/core"
import {Http, Headers, Response} from "angular2/http"
import {Shipment} from "./ShipmentViewModel"
import {SearchViewModel} from "./SearchViewModel"

@Injectable()
export class ShipmentService
{
    public headers: Headers;
    public constructor(public http: Http) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
    }

    getShipments(pageNumber: number, itemCount: number, search: SearchViewModel) {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: 'http://localhost:4163/shipments/Get',
            data: JSON.stringify({ itemCount: itemCount }),
            contentType: "application/json",
            success: function (data) {
                alert(data);
            },
            error: function (error) {
                var x = error; //break here for debugging.
            }
        });
        //this.http.post('http://localhost:4163/shipments/Get', JSON.stringify({ itemCount: itemCount }), this.headers).map((res: Response) => res.json()).subscribe();
    }

    getShipmentDetail(id: number) {
        return this.http.get('?id=' + id).map(res => res.json(), this.headers).map((result: Shipment) =>
        {
            return result;
        }).subscribe();
    }

    saveShipment(shipment: Shipment) {
        this.http.post('', JSON.stringify(shipment), this.headers).
            map(res => res.json()).subscribe();
    }
}
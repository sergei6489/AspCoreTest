///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import { Injectable } from "angular2/core"
import {Http, Headers, Response, RequestOptions} from "angular2/http"
import {Shipment} from "./ShipmentViewModel"
import {SearchViewModel} from "./SearchViewModel"
import {PagerShipments} from "./PagerShipments"

@Injectable()
export class ShipmentService
{
    private headers: Headers;
    private options: RequestOptions;
    public constructor(public http: Http) {
    }

    getShipments(pageNumber: number, itemCount: number, search: SearchViewModel) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
        var result: PagerShipments;
        return this.http.post('http://localhost:4163/shipments/Get', JSON.stringify({ itemCount: itemCount, pageNumber: pageNumber, From: search.From, To: search.To, DateShipment: search.DateShipment }), this.options)
            .map(result);
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
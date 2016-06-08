///<reference path="./typings/tsd.d.ts" />

import { Injectable } from "@angular/core"
import {Http, Headers, Response, RequestOptions} from "@angular/http"
import {Shipment} from "./ShipmentViewModel"
import {SearchViewModel} from "./SearchViewModel"
import {PagerShipments} from "./PagerShipments"
import { Observable }  from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class ShipmentService
{
    private headers: Headers;
    private options: RequestOptions;
    public constructor(public http: Http) {
    }

    getShipments( search: SearchViewModel ) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers });
        return this.http.post('http://localhost:4163/shipments/Get', JSON.stringify(search), this.options)
            .map(this.ExtractData).catch(this.handleError);
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

    private ExtractData(res: Response) {
        if (res.status < 200 || res.status >= 300)
            throw new Error('Response error:' + res.status);
        let result = res.json();
        return result || {};
    }
    private handleError(error: any) {
        let errMsg = error.message || 'Server error';
        console.error(errMsg); 
        return Observable.throw(errMsg);
    }
}
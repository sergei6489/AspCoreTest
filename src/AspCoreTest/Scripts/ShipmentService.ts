import { Injectable } from "angular2/core"
import {Shipment} from "./ShipmentViewModel"

@Injectable()
export class ShipmentService
{
    getShipments(pageNumber:number,itemCount: number) {
        /*
        this.http.get('http://localhost:4163/api/shipments/').map(res=>
            res.json()
        ).map((shipments: Array<any>) => {
            let result: Array<Shipment> = [];
            shipments.forEach(elem=> {
                result.push(new Shipment(elem.Id, elem.From, elem.To, elem.DateTime, elem.Price));
            });
        }).subscribe();
        */
    }

    getShipmentDetail(id: number) {

    }

    saveShipment(shipment: Shipment) {
    }
}
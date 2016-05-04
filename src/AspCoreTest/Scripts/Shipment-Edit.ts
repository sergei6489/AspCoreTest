///<reference path="./typings/tsd.d.ts" />
import {Component, Input} from 'angular2/core';
import { Shipment } from './ShipmentViewModel';
import {ElementRef} from 'angular2/core';
import {NgForm}    from 'angular2/common';
import {EmailValidator} from './customValidation';
import { MockDirectionString } from './Ioc/MockShipments';

@Component({
    selector: "shipment-edit",
    templateUrl: "app/partials/shipment-edit.html",
    directives: [EmailValidator,]
})
export class ShipmentEdit {
    shipment = new Shipment(1, "Barcelona", "Moscow", new Date(), [], 4555);
    directions: Array<string> = [];

    constructor(private elemRef: ElementRef) {
        jQuery(this.elemRef.nativeElement).dialog({
            height: 400,
            width: 450,
            modal: true,
            autoOpen: false,
            show: {
                effect: "blind",
                duration: 500
            },
            hide: {
                effect: "explode",
                duration: 200
            }
        });
    }

    getData() {
        this.directions = MockDirectionString;
    }

    OnShowDialog(shipment: Shipment) {
        this.getData();
        this.shipment = new Shipment(shipment.Id, shipment.From, shipment.To, shipment.DateTime, shipment.Places, shipment.Price);
        jQuery(this.elemRef.nativeElement).dialog("open");
    }
}
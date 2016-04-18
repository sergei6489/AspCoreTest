///<reference path="./typings/tsd.d.ts" />
import {Component, Input} from 'angular2/core';
import { Shipment } from './ShipmentViewModel';
import {ElementRef} from 'angular2/core';
import {NgForm}    from 'angular2/common';

@Component({
    selector: "shipment-edit",
    templateUrl: "app/partials/shipment-edit.html"
})
export class ShipmentEdit {
    shipment = new Shipment(0, '', '', null, 0);
    directions: Array<string> = [];

    constructor(private elemRef: ElementRef) {
        jQuery(this.elemRef.nativeElement).dialog({
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
        this.directions.push('sdfsdf');
        this.directions.push('fsdfdfssdsdsd');
       // this.http.get('');
    }

    OnShowDialog(shipment: Shipment) {
        this.shipment = shipment;
        this.getData();
        jQuery(this.elemRef.nativeElement).dialog("open");
        this.getData();
    }
}
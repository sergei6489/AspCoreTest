﻿///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter } from 'angular2/core'
import {Http} from "angular2/http"
@Component({
    selector: 'comboBoxTemplate',
    template:`<label>{{text}}</label>
                    <div class="input-group">
                        <input [(ngModel)]="value" class="form-control" (input)="Changed($event)"/>
                        <div class="input-group-btn">
                            <button type="button"  class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                            <ul #menuRef class="dropdown-menu dropdown-menu-right" role="menu">
                                <li *ngFor="#direction of directions" class="input-lg"><a href="#" (click)="selectItem($event)" >{{direction}}</a></li>
                            </ul>
                        </div>
                    </div>`
})
export class SearchControl {
    @Input() text: string;
    @Input() value: string;
    @Output() valueChange: EventEmitter<String> = new EventEmitter<String>();
    public directions: Array<string> = [];
    @ViewChild('menuRef') menuRef: ElementRef;

    public constructor(public http: Http) {
    }

    getData(text: string) {
        this.http.get("http://localhost:4163/Shipments/GetDirections?data=" + text).map(res =>
            res.json()).map((directions: Array<string>) => {
            this.directions = [];
            directions.forEach((data: string) => { this.directions.push(data) });
            if (directions.length != 0) {
                jQuery(this.menuRef.nativeElement).dropdown('toggle');
            }
            }).subscribe();

    }

    Changed(event) {
        this.valueChange.emit(event.target.value);
        this.getData(event.target.value);
    }
}
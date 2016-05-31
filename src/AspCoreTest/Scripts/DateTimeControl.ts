///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit } from 'angular2/core'
import {Http} from "angular2/http"
@Component({
    selector: 'DateTimePicker',
    template: `<input class="form-control" #dateControl [(ngModel)]='value' (input)="Changed($event.target.value)" />`
})

export class DateTimeControl implements AfterViewInit  {
    @Input() value: Date;
    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
    @ViewChild('dateControl') dateControl: ElementRef;

    ngAfterViewInit() {
        jQuery(this.dateControl.nativeElement).datepicker({ dateFormat: "dd.mm.yy" });this.value.setMonth(12);
        jQuery(this.dateControl.nativeElement).datepicker("setDate", this.value.toLocaleDateString());
    }

    changed(value) {
        this.valueChange.emit(value);
    }
}
///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter, AfterViewInit } from 'angular2/core'
import {Http} from "angular2/http"

@Component({
    selector: 'DateTimePicker',
    template: `<div class="input-group">
                 <input type="text" class="form-control" #dateControl [(ngModel)]='value'/>
                <div class="input-group-btn">
                    <button (click)="clear()" class="btn btn-default"><span class="glyphicon glyphicon-remove"></span></button>
                    <button (click)="openDatePicker()" class="btn btn-default"><span class="glyphicon glyphicon-calendar"></span></button>
                </div>
               </div>`

})

export class DateTimeControl implements AfterViewInit {
    @Input() value: Date;
    @Output() valueChange: EventEmitter<Date> = new EventEmitter<Date>();
    @ViewChild('dateControl') dateControl: ElementRef;

    ngAfterViewInit() {
        let picker = jQuery(this.dateControl.nativeElement);
        let self = this;
        picker.datepicker({
            dateFormat: "dd.mm.yy",
            onSelect: function (textDate) {
                self.changed(this.value);
            }
        });
        if (this.value != null)
        picker.datepicker("setDate", this.value.toLocaleDateString());
    }

    openDatePicker() {
        jQuery(this.dateControl.nativeElement).datepicker("show");
    }

    changed(value) {
        this.value = new Date(value);
        this.valueChange.emit(value);
    }

    clear() {
        this.changed(null);
    }
}
///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component, ElementRef, ViewChild, Input, Output, EventEmitter } from 'angular2/core'
@Component({
    selector: 'comboBoxTemplate',
    template:`<label>{{text}}</label>
                    <div class="input-group">
                        <input [(ngModel)]="value" class="form-control" (input)="Changed($event)"/>
                        <div class="input-group-btn">
                            <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>
                            <ul #menuRef class="dropdown-menu dropdown-menu-right" role="menu">
                                <li *ngFor="#direction of directions" class="input-lg"><a href="#" >{{direction}}</a></li>
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


    getData(text:string) {

    }

    Changed(event) {
        this.valueChange.emit(event.target.value);
    }
}
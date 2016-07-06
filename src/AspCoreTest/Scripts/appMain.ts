///<reference path="./typings/tsd.d.ts" />
import {Component} from "@angular/core";
import {ROUTER_DIRECTIVES} from "@angular/router"

@Component({
    selector: "myApp",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES]
})

export class appMain {
    constructor() {
    }
}
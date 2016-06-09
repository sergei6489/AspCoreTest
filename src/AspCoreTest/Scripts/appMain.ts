///<reference path="./typings/tsd.d.ts" />
import {Component} from "@angular/core"
import { Routes, Router, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, RouteSegment } from '@angular/router';
import {TicketComponent} from "./TicketComponent"
import { AppComponent } from "./appController"
import { ShipmentService } from "./ShipmentService";
import { SearchViewModel } from "./SearchViewModel";

@Component({
    selector: "myApp",
    template: "<router-outlet></router-outlet>",
    directives: [ROUTER_DIRECTIVES],
    providers: [ROUTER_PROVIDERS, ShipmentService, SearchViewModel]
})

    @Routes(
        [
            {
                path: "/*",
                component: AppComponent
            },
        {
            path: "/buyTickets",
            component: TicketComponent
            }])
export class appMain {
    constructor(router: Router) {
    }
}
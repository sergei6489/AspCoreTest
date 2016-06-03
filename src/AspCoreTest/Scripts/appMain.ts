///<reference path="./typings/tsd.d.ts" />
///<reference path="../node_modules/angular2/typings/browser.d.ts"/>
import {Component} from "angular2/core"
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS } from 'angular2/router';
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

@RouteConfig(
    [{
        path: "/",
        name: "Default",
        component: AppComponent,
        useAsDefault: true
    },
        {
            path: "/buyTickets",
            name: "BuyTicket",
            component: TicketComponent
        }])
export class appMain {
}
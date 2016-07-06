import {RouterConfig} from "@angular/router";
import {ShipmentsComponent} from "../Components/ShipmentsComponent";
import {TicketComponent } from "../Components/TicketComponent"

export const ShipmentsRouters: RouterConfig = [
    { path: '', component: ShipmentsComponent },
    { path: 'ticketBuy:id', component: TicketComponent }
]
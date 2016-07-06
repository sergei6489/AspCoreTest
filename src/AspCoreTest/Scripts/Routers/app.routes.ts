import { provideRouter, RouterConfig }  from '@angular/router';

import { ShipmentsRouters } from './shipments.routes';
import { UserRoutes }       from './user.routes';

export const routes: RouterConfig = [
    ...ShipmentsRouters,
    ...UserRoutes
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];

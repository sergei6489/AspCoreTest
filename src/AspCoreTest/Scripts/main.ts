import { bootstrap }    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { appMain } from './appMain';
import {APP_ROUTER_PROVIDERS} from './Routers/app.routes';
import {LocationStrategy, Location, HashLocationStrategy } from '@angular/common';
import {provide} from '@angular/core'


bootstrap(appMain, [HTTP_PROVIDERS, APP_ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
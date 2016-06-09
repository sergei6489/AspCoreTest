import { bootstrap }    from '@angular/platform-browser-dynamic';
import {HTTP_PROVIDERS} from '@angular/http';
import { appMain } from './appMain';

bootstrap(appMain, HTTP_PROVIDERS);
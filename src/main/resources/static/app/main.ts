import { bootstrap }    from 'angular2/platform/browser';
import {ROUTER_PROVIDERS} from 'angular2/router';
import { AppComponent } from './app.component';
import {HTTP_PROVIDERS} from "angular2/http";

bootstrap(AppComponent, [HTTP_PROVIDERS]);

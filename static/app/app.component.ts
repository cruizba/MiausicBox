import {Component, OnInit} from 'angular2/core';
import { RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS, Router } from 'angular2/router';

import { SignInComponent } from './signin.component';
import { VisitorComponent } from './visitor.component';
import { IndexComponent } from './index.component';
import { LoggedComponent } from './logged.component';
import { PrincipalComponent } from './principal.component';
import { ArtistaComponent } from './profile.component';
import { MessagesComponent } from './messages.component';
import { EventsComponent } from './events.component';
import { ListArtistComponent } from './list-artist.component'
import { ListBandsComponent } from './list-bands.component'



@Component({
    selector: 'my-app',
    template: `
    <div id="navPag">
      <logged></logged>
    </div>
    <principal></principal>
    <router-outlet></router-outlet>
    `,
    directives: [ROUTER_DIRECTIVES, LoggedComponent],
    providers: [
        ROUTER_PROVIDERS
    ]
})

@RouteConfig([
    {
      path: '/index',
      name: 'Index',
      component: IndexComponent,
      useAsDefault: true
    },
    {
        path: '/visitor',
        name: 'Visitor',
        component: VisitorComponent
    },
    {
      path: '/signin',
      name: 'SignIn',
      component: SignInComponent
    },
    {
      path: '/principal',
      name: 'Principal',
      component: PrincipalComponent
    },
    {
      path: '/artist',
      name: 'Artist',
      component: ArtistaComponent
    },
    {
      path: '/messages',
      name: 'Messages',
      component: MessagesComponent
    },
    {
      path: '/events',
      name: 'Events',
      component: EventsComponent
    },
    {
      path: '/listArtist',
      name: 'ListArtist',
      component: ListArtistComponent
    },
    {
      path: '/listBands',
      name: 'ListBands',
      component: ListBandsComponent
    }
])

export class AppComponent{


  constructor(private _router: Router){
    this.routerSuscription();
  }


  //We suscribe to router to know when we should put the nav on page
  //and change navbar
  routerSuscription(){
    this._router.subscribe((val) => {
      if(val == "index" || val == "visitor" || val == "signin"){
        $("#navPag").css("visibility", "");
      }
      else{
        $("#navPag").css("visibility", "visible");
      }
    });
  }


}

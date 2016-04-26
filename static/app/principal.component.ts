import { Component, Input, OnInit } from 'angular2/core';
import { AppComponent } from './app.component';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { BandService } from './services/band.service';
import { UserService } from "./services/user.service";
import { BlogService } from "./services/blog.service";
import {PrincipalService} from "./services/principal.service";
import {BlogUser} from "./classes/BlogUser";
import {BlogBand} from "./classes/BlogBand";
import {Novelty} from "./classes/Novelty";
import {Event} from "./classes/Event"


@Component({
  selector: 'principal',
  templateUrl: 'templates/principal.html',
  providers: [BandService, UserService, BlogService, PrincipalService],
  directives: [ROUTER_DIRECTIVES]
})

export class PrincipalComponent {
  novedades = [];

  constructor(private_routeParams: RouteParams, private _bandService: BandService, private _blogService: BlogService,
              private _userService: UserService, private _principalService: PrincipalService){
  }

  ngOnInit() {
    this.initialization();
  }

  initialization(){
    this._principalService.getAll().subscribe(
        (novedades => this.novedades = novedades),
        (error => alert("getAll error"))
    )
  }

  parseOne(obj):number{
    if (obj instanceof BlogUser){
      console.log("BLOGUSER");
      return 0;
    } else if (obj instanceof BlogBand){
      console.log("BLOGBAND");
      return 1;
    } else if (obj instanceof Event){
      console.log("PRINCIPAL COMPONENT ---- DEBERIA SALIR AL MENOS UNA VEZ, NO?");
      return 2;
    } else if (obj instanceof Novelty) {
      console.log("NOVELTY");
      return 3;
    } else {
      console.log("cosa raraa ");
      console.log(obj);
      return 4;
    }
  }
}

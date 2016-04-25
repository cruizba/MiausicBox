import { Component, Input, OnInit } from 'angular2/core';
import { AppComponent } from './app.component';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { BandService } from './services/band.service';
import { UserService } from "./services/user.service";
import { BlogService } from "./services/blog.service";


@Component({
  selector: 'principal',
  templateUrl: 'templates/principal.html',
  providers: [BandService, UserService, BlogService],
  directives: [ROUTER_DIRECTIVES]
})

export class PrincipalComponent {
  novedades = [];

  constructor(private_routeParams: RouteParams, private _bandService: BandService, private _blogService: BlogService,
  private _userService: UserService){
  }

  ngOnInit() {
    this.initialization();
  }

  initialization(){
    
  }
}

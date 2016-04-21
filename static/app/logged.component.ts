import { Component, OnInit } from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';
import {Info} from "./classes/Info";


@Component({
  selector: 'logged',
  templateUrl: 'templates/nav-template.html',
  directives: [ROUTER_DIRECTIVES]
})


export class LoggedComponent{

  constructor(private _router: Router){};

  goToProfile(){
    var id = Info.userId;

    this._router.navigate(['Artist', {id: Info.userId}])
  }
}

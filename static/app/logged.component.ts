import { Component, OnInit } from 'angular2/core';
import {ROUTER_DIRECTIVES, Router} from 'angular2/router';


@Component({
  selector: 'logged',
  templateUrl: 'templates/nav-template.html',
  directives: [ROUTER_DIRECTIVES]
})


export class LoggedComponent{

  constructor(){};

}

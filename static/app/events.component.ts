import { Component, OnInit } from 'angular2/core';
import { EventService } from './services/event.service';
import {UserService} from "./services/user.service";


@Component({
  selector: 'events',
  templateUrl: 'templates/eventos.html',
    providers: [EventService]
})

export class EventsComponent {

  events = [];
  id;

  constructor (private _userService: UserService){

  }

  ngOnInit () {
      console.log("ngOnInit cargando cosas blablabla");
    //this._eventService.getAllEvent().subscribe(
      //  list => this.events = list,
       // error => {
         // this.events = null;
         // alert ("list events not found");
       // }
    //)
  }

}

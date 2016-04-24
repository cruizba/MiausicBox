import { Component, OnInit } from 'angular2/core';
import { EventService } from './services/event.service';
import {UserService} from "./services/user.service";
import {ROUTER_DIRECTIVES} from "angular2/router";


@Component({
  selector: 'events',
  templateUrl: 'templates/eventos.html',
    providers: [EventService],
    directives: [ROUTER_DIRECTIVES]
})

export class EventsComponent {

  events = [];
  id;

  constructor (private _eventService: EventService){

  }

  ngOnInit () {
    console.log("ngOnInit cargando cosas blablabla");
    this._eventService.getAllEvent().subscribe(
        (list => this.events = list),
        (error => {
          this.events = null;
          alert("List events not found");
        })
    );
  }

}

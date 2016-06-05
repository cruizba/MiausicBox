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


  constructor (private _eventService: EventService){}

  ngOnInit () {
    this.initialization();
  }

    initialization(){
        this._eventService.getAllEvent().subscribe(
            (list => this.events = list),
            (error => {
                this.events = null;
                alert("List events not found");
            })
        );
    }

    findEventsByName(name:String){
        this.events = [];
        if (0==name.length){
            this._eventService.getAllEvent().subscribe(
                (list => this.events = list),
                (error => {
                    this.events = null;
                    alert("List events not found");
                })
            );
        }else{
            this._eventService.getEventsByName(name).subscribe(
                list => this.events = list,
                error =>{
                    this.events = null;
                    alert ("ERROR");
                }
            )
        }
    }
    
    findEventsByBand(name:String){
        this.events = [];
        if (0==name.length){
            this._eventService.getAllEvent().subscribe(
                (list => this.events = list),
                (error => {
                    this.events = null;
                    alert("List events not found");
                })
            );
        }else{
            this._eventService.getEventsByBandName(name).subscribe(
                list => this.events = list,
                error =>{
                    this.events = null;
                    alert ("ERROR");
                }
            )
        }
        console.log(this.events);
    }

}

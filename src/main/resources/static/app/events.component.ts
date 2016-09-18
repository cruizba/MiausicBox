/**
 * MiausicBox events component.
 * @component EventsComponent
 */
import { Component } from '@angular/core';
import { EventService } from './services/event.service';

@Component({
  selector: 'events',
  templateUrl: 'templates/eventos.html'
})

export class EventsComponent {

  events = [];
  id;

  constructor (private _eventService: EventService){}

  ngOnInit () {
    this.initialization();
  }

    initialization(){
      this._eventService.getAllEvents().subscribe(
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
        this._eventService.getAllEvents().subscribe(
          (list => this.events = list),
          (error => {
            this.events = null;
            alert("List events not found");
          })
        );
      } else {
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
        this._eventService.getAllEvents().subscribe(
          (list => this.events = list),
          (error => {
            this.events = null;
            alert("List events not found");
          })
        );
      } else {
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

import { Component, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import { Event } from './classes/Event';
import {EventService} from "./services/event.service";
import {BandService} from "./services/band.service";
import {FollowService} from "./services/follow.service";

@Component ({
    selector: 'Event',
    templateUrl: 'templates/evento.html',
    providers: [EventService, BandService, FollowService],
    directives: [ROUTER_DIRECTIVES]
})

export class EventComponent {
    
    event: Event;
    id;
    members = [[]];
    numberFollows:number;
    followers=[];

    
    constructor ( private _eventService:EventService, private _bandService:BandService,
                  private _followService: FollowService, private _routerParams:RouteParams){}

    ngOnInit (){
        this.id = this._routerParams.get('id');

        this._eventService.getEventByID(this.id).subscribe(
            event => this.event = event,
            error =>{
                this.event = null;
                alert ("Event not found");
            }
        );

        for (let i = 0; i < this.event.bands.length; i++){
            this.members.push(this.membersBand(i));
        }
        
        this.numberOfFollowers();
    }

    membersBand (i) {
        console.log("me meto en memberBand");
        var result = [];
        this._bandService.getMembers(i).subscribe(
            mem => result = mem,
            error => {
                result = null;
                alert("Members not found");
            }
        );
        return result;
    }
        
    numberOfFollowers (){
            this._eventService.getNumberOfFollowers(this.id).subscribe(
                num => this.numberFollows = num,
                error =>{
                    this.numberFollows = null;
                    alert("Error");
                });
    }
    
}
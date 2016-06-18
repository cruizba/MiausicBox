/**
 * MiausicBox event component.
 * @component EventComponent
 */
import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Event } from './classes/Event';
import { EventService } from "./services/event.service";
import { BandService } from "./services/band.service";
import { Info } from "./classes/Info";

@Component ({
    selector: 'Event',
    templateUrl: 'templates/evento.html',
    providers: [EventService, BandService],
    directives: [ROUTER_DIRECTIVES]
})

export class EventComponent {
    
    event: Event;
    id;
    members = [[]];
    isFollower:boolean;
    isCreator:boolean;
    
    constructor (private _eventService:EventService, private _bandService:BandService,
                 private _routerParams:RouteParams){}

    ngOnInit (){
        this.id = this._routerParams.get('id');

        this.inizialitationEvent();
        //this.inizialitationIsFollower();
        //this.inizialitationIsCreator();
    }

    inizialitationEvent (){
        console.log("INITIALIZATION!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        this._eventService.getEventByID(this.id).subscribe(
            event => {
                console.log("Nos ha tocado esto >");
                console.log(event);
                this.event = event;
                if (this.event.creator.equals(Info.userLogged)){
                    console.log("Es creador");
                    this.isCreator = true;
                } else {
                    console.log("NO es creador");
                    this.isCreator = false;
                }
            },
            error =>{
                this.event = null;
                alert ("Event not found");
            }
        );
    }
    /*
    inizialitationIsFollower(){
        this._eventService.getIsFollower(this.id).subscribe(
            follow => this.isFollower = follow,
            error=> {
                this.isFollower=null;
                alert("Error");
            }
        );

    }*/
/*
    inizialitationIsCreator(){
        this._eventService.getIsCreator(this.id).subscribe(
            creator => this.isCreator = creator,
            error => {
                this.isCreator = null;
                alert ("Error");
            }
        );
    }*/
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
    
    unFollowEvent(){
        this._eventService.unFollow(this.id);
        this.isFollower = false;
        this.event.followers.slice(this.event.followers.indexOf(Info.userLogged),1);
    }

    followEvent(){
        this._eventService.follow(this.id);
        this.isFollower = true;
        this.event.followers.push(Info.userLogged);
    }
    
}
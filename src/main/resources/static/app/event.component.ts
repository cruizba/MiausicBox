import { Component, OnInit } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES} from 'angular2/router';
import { Event } from './classes/Event';
import {EventService} from "./services/event.service";
import {BandService} from "./services/band.service";
import {FollowService} from "./services/follow.service";
import {Info} from "./classes/Info";

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
    numberFollows:number;
    followers=[];
    isFollower:boolean;
    isCreator:boolean;

    
    constructor ( private _eventService:EventService, private _bandService:BandService, private _routerParams:RouteParams){}

    ngOnInit (){
        this.id = this._routerParams.get('id');

        this.inizialitationEvent();
        this.inizialitationIsFollower();
        //this.inizialitationIsCreator();
        this.numberOfFollowers();
    }

    inizialitationEvent (){
        this._eventService.getEventByID(this.id).subscribe(
            event => {
                this.event = event;
                if (event.creator.equals(Info.userLogged)){
                    this.isCreator = true;
                } else {
                    this.isCreator = false;
                }
            },
            error =>{
                this.event = null;
                alert ("Event not found");
            }
        );

        for (let i = 0; i < this.event.bands.length; i++){
            this.members.push(this.membersBand(i));
        }
    }
    inizialitationIsFollower(){
        this._eventService.getIsFollower(this.id).subscribe(
            follow => this.isFollower = follow,
            error=> {
                this.isFollower=null;
                alert("Error");
            }
        );

    }
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
        
    numberOfFollowers (){
            this._eventService.getNumberOfFollowers(this.id).subscribe(
                num => this.numberFollows = num,
                error =>{
                    this.numberFollows = null;
                    alert("Error");
                });
    }
    
    unFollowEvent(){
        this._eventService.unFollow(this.id);
        this.isFollower = false;
        this.numberOfFollowers();
    }

    followEvent(){
        this._eventService.follow(this.id);
        this.isFollower = true;
        this.numberOfFollowers();
    }
    
}
/**
 * MiausicBox event component.
 * @component EventComponent
 */
import { Component } from 'angular2/core';
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
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
    
    constructor (private _router: Router, private _eventService:EventService, private _bandService:BandService,
                 private _routerParams:RouteParams){}

    ngOnInit(){
        this.id = this._routerParams.get('id');
        this.inizialitationEvent();
    }

    inizialitationEvent(){
        this._eventService.getEventByID(this.id).subscribe(
            event => {
                this.event = event;
                this.isCreator = this.event.creator.equals(Info.userLogged);
                this.isFollower = this.event.isFollower(Info.userLogged);
            },
            error =>{
                this.event = null;
                alert(error);
            }
        );
    }

    membersBand(i) {
        var result = [];
        this._bandService.getMembers(i).subscribe(
            mem => result = mem,
            error => {
                result = null;
                alert(error);
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
    
    editFecha(newFecha){
        this._eventService.setFecha(newFecha, this.id).subscribe(
            response => {
                if(response.status == 200){
                    this._eventService.getEventByID(this.id).subscribe(
                        event => this.event = event
                    )
                }
            },
            error => alert ("No se ha podido modificar la fecha")
        );
    };
    
    editCiudad(nuevaCiudad){
        this._eventService.setCity(nuevaCiudad, this.id).subscribe(
        response => {
            if(response.status == 200){
                this._eventService.getEventByID(this.id).subscribe(
                    event => this.event = event
                )
            }
        },
        error => alert("No se ha podido editar el campo")
    );};

    newBand (nameBand){
        this._eventService.addNewBand(nameBand, this.id).subscribe(
            response => {
                if(response.status == 200){
                    this._eventService.getAllBands(this.id).subscribe(
                        bands => this.event.bands = bands
                    )
                }else{
                    console.log(response.status);
                }
            },
            error => console.log(error)
        );

    }
    
    
}
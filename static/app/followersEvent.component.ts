///<reference path="../node_modules/angular2/router.d.ts"/>
import { Component, OnInit } from 'angular2/core';
import { EventService } from './services/event.service';

import {ROUTER_DIRECTIVES, RouteParams} from "angular2/router";


@Component({
    selector: 'followersEvent',
    templateUrl:'templates/followers.html',
    providers: [EventService],
    directives:[ROUTER_DIRECTIVES]
})

export class FollowersEvent {
    userList = [];
    id;

    constructor (private _eventService:EventService, private _routeParams: RouteParams){}

    ngOnInit() {
        this.id = this._routeParams.get('id');

        this._eventService.getFollowers(this.id).subscribe(
            
            list => this.userList = list,
            error => {
                this.userList = null;
                alert ("Error");
            }
        );
        console.log(this.userList[0].user.userName);
    }
}
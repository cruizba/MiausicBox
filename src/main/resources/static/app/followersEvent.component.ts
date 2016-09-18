/**
 * MiausicBox followers event component.
 * @component FollowersEventComponent
 */
import { Component } from '@angular/core';
import { EventService } from './services/event.service';

import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'followersEvent',
    templateUrl:'templates/followers.html'
})

export class FollowersEvent {

    userList = [];
    id;

    constructor (private _eventService:EventService, private _routeParams: ActivatedRoute){}

    ngOnInit() {
        this._routeParams.params.subscribe(params => {
            this.id = params['id'];
        });

        this._eventService.getFollowers(this.id).subscribe(
            
            list => this.userList = list,
            error => {
                this.userList = null;
                alert ("Error");
            }
        );
    }

}

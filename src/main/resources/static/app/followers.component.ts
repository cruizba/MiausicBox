/**
 * MiausicBox followers component.
 * @component FollowersComponent
 */
import { FollowService } from "./services/follow.service";
import { Component } from "@angular/core";
import {ActivatedRoute } from "@angular/router";

@Component({
    selector: 'followers',
    templateUrl: 'templates/followers.html'
})

export class FollowersComponent{

    userList = [];
    id;

    constructor(private _followService: FollowService,
                private _routeParams: ActivatedRoute){}

    ngOnInit(){
        this._routeParams.params.subscribe(params => {
            this.id = params['id'];
        });

        this._followService.getFollowersById(this.id).subscribe(
            (userList => this.userList = userList),
            (error => alert("Error get following"))
        )
        
    }
    
    

}

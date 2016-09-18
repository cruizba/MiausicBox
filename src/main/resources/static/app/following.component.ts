/**
 * MiausicBox following component.
 * @component FollowingComponent
 */
import { FollowService } from "./services/follow.service";
import { Component } from "@angular/core";
import {ActivatedRoute} from "@angular/router";


@Component({
    selector: 'following',
    templateUrl: 'templates/following.html'
})

export class FollowingComponent{

    userList = [];
    id;
    
    constructor(private _followService: FollowService, 
                private _routeParams: ActivatedRoute){}

    ngOnInit(){
        this._routeParams.params.subscribe(params => {
            this.id = params['id'];
        });
        
        this._followService.getFollowingById(this.id).subscribe(
            (userList => this.userList = userList),
            (error => alert("Error get following"))
        )
    }

}

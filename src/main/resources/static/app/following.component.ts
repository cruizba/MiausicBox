/**
 * MiausicBox following component.
 * @component FollowingComponent
 */
import { UserService } from "./services/user.service";
import { FollowService } from "./services/follow.service";
import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES, RouteParams } from "angular2/router";

@Component({
    selector: 'following',
    templateUrl: 'templates/following.html',
    providers: [UserService, FollowService],
    directives: [ROUTER_DIRECTIVES]
})

export class FollowingComponent{

    userList = [];
    id;
    
    constructor(private _followService: FollowService, 
                private _routeParams: RouteParams){}

    ngOnInit(){
        this.id = this._routeParams.get('id');
        
        this._followService.getFollowingById(this.id).subscribe(
            (userList => this.userList = userList),
            (error => alert("Error get following"))
        )
    }

}

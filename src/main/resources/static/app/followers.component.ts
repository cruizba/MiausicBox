/**
 * MiausicBox followers component.
 * @component FollowersComponent
 */
import { UserService } from "./services/user.service";
import { FollowService } from "./services/follow.service";
import { Component } from "angular2/core";
import { ROUTER_DIRECTIVES, RouteParams } from "angular2/router";

@Component({
    selector: 'followers',
    templateUrl: 'templates/followers.html',
    providers: [UserService, FollowService],
    directives: [ROUTER_DIRECTIVES]
})

export class FollowersComponent{

    userList = [];
    id;

    constructor(private _followService: FollowService,
                private _routeParams: RouteParams){}

    ngOnInit(){
        this.id = this._routeParams.get('id');

        this._followService.getFollowersById(
            this.id).subscribe(
            (userList => this.userList = userList),
            (error => alert("Error get following"))
        )
        console.log(this.userList);
        
    }
    
    

}

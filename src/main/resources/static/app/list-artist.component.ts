/**
 * MiausicBox list artist component.
 * @component ListArtistComponent
 */
import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import { UserService } from "./services/user.service";
import { BandService } from "./services/band.service";

@Component({
  selector: 'list-artis',
  templateUrl: 'templates/listaArtistas.html',
  providers: [UserService, BandService],
  directives: [ROUTER_DIRECTIVES]
})

export class ListArtistComponent {

  userList = [];

  constructor(private _userService:UserService){}

    ngOnInit () {
        this.initUserList();
    }

    initUserList() {
        this._userService.getAllUsers().subscribe(
            users => this.userList = users,
            error => {
                this.userList = null;
                alert("list not found");
            }
        );
    }

    findByName (name:String){
        this._userService.getUsersByName(name).subscribe(
            users => this.userList = users,
            error => {
                this.userList = null;
                alert("list not found");
            }
        );
    }

}

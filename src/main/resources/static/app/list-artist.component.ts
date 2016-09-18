/**
 * MiausicBox list artist component.
 * @component ListArtistComponent
 */
import { Component } from '@angular/core';
import { UserService } from "./services/user.service";

@Component({
  selector: 'list-artis',
  templateUrl: 'templates/listaArtistas.html'
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

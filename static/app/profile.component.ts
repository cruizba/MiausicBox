import { Component, Input, OnInit } from 'angular2/core';
import { Router} from 'angular2/router';
import { AppComponent } from './app.component';
import { UserService } from './services/user.service';
import { User } from './classes/User'


@Component({
  selector: 'artista',
  templateUrl: 'templates/artista.html',
  providers: [UserService]
})

export class ArtistaComponent {

  user: User

  constructor(private _userService:UserService){
    _userService.getAllUsers().then(
      //If we have a result
      user => this.user = user[0],
      //If an error has ocurred receiving data
      error => {
        this.user = null;
        alert("name not found");
      });
  }




}

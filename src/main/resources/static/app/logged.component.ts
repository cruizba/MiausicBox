/**
 * MiausicBox logged component.
 * @component LoggedComponent
 */
import { Component } from 'angular2/core';
import { ROUTER_DIRECTIVES, Router } from 'angular2/router';
import { Info } from "./classes/Info";
import { UserService } from "./services/user.service";

@Component({
  selector: 'logged',
  templateUrl: 'templates/nav-template.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

export class LoggedComponent{

  password:string;
  password2:string;
  user:string;
  completeName:string;
  email:string;
  isArtist:boolean;
  description:string;
  
  constructor(private _router: Router, private _userService: UserService){}

  goToProfile(){
    this._router.navigate(['Artist', {id: Info.userId}]);
  }

  goToMessage(){
    this._router.navigate(['Messages', {id: Info.userId}]);
  }
  
  submitConfiguration(){
    if (this.user != ""){
      this._userService.changeUser(this.user);
    }
    if (this.completeName != ""){
      this._userService.changeName(this.completeName);
    }
    if (this.email != ""){
      this._userService.changeEmail(this.email);
    }
    if (this.isArtist != Info.userId.isArtist){
      this._userService.changeIsArtist(this.isArtist);
    }
    if (this.description != ""){
      this._userService.changeDescription(this.description);
    }
  }
  
  submitPass(){
    if (this.password == this.password2){
      this._userService.changePassword(this.password);
    }
  }

}

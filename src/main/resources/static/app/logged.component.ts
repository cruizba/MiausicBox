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
  userName:string;
  completeName:string;
  email:string;
  isArtist:boolean;
  description:string;
  
  constructor(private _router: Router, private _userService: UserService){}

  ngOnInit(){
    if(Info.userLogged != null) {
      this.userName = Info.userLogged.userName;
      this.completeName = Info.userLogged.completeName;
      this.email = Info.userLogged.email;
      this.isArtist = Info.userLogged.isArtist;
      this.description = Info.userLogged.description;
    }
  }
  

  goToProfile(){
    this._router.navigate(['Artist', {id: Info.userId}]);
  }

  goToMessage(){
    this._router.navigate(['Messages', {id: Info.userId}]);
  }
  
  submitConfiguration(){
    this._userService.modifyUser(this.userName, this.completeName, this.email, this.isArtist, this.description).subscribe(
        response => {
          alert("Modificación realizada con éxito");
          this._userService.getUserById(Info.userId).subscribe(
              response => {
                Info.userLogged = response;
                Info.userId = response.id;
              }
          );

          //No hagáis esto en casa
          this._router.navigate(['ListArtist']);
          this._router.navigate(['Artist', {id: Info.userId}]);
        }
    )
  }
  
  submitPass(){
      this._userService.modifyPass(this.password, this.password2).subscribe(
          response => alert("Contraseña cambiada")
      )
  }

}

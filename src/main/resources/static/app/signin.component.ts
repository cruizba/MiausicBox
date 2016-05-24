import { Component, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {Info} from "./classes/Info";
import {UserService} from "./services/user.service";
import {User} from "./classes/User";


@Component({
  selector: 'signin',
  templateUrl: 'templates/signin.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

export class SignInComponent{
  username:string;
  password:string;
  password2:string;
  free:boolean;
  newUser:User;
  id:number;

  constructor(private _router: Router,  private _userService: UserService){

  }

  ngOnInit(){
    this.initialization();
  }

  initialization() {

  }

  goToIndex(){
    this._router.navigate(['Index']);
  }

  signin() {
    this._userService.checkUserByUsername(this.username).subscribe(
        (free => this.free= free),
        (error => alert("Username not available"))
    );
    if (this.password.length < 1 || this.password != this.password2) {
      alert("Passwords not equals");
      return;
    }
    if(this.free){
      this.newUser = new User(this.username,this.password, this.username, "", "", false, "", "", "", "", [], [], [], []);
      this._userService.addUser(this.newUser).subscribe(
          (id => this.id = id),
          (error => alert("addUser error"))
      )
      Info.userLogged = this.newUser;
      Info.userId = this.id;
      this._router.navigate(['Artist', {id: Info.userId}]);
    }
    else{
      $("#userLoginError").fadeIn(1000);
    }
  }

}

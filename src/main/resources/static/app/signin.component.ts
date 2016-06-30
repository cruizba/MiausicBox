/**
 * MiausicBox sign in component.
 * @component SignInComponent
 */
import { Component } from 'angular2/core';
import { Router, ROUTER_DIRECTIVES } from 'angular2/router';
import { Info } from "./classes/Info";
import { UserService } from "./services/user.service";
import { User } from "./classes/User";
import {emptyUser, toInstance} from "./classes/Utils";
import {LoginService} from "./services/login.service";

@Component({
  selector: 'signin',
  templateUrl: 'templates/signin.html',
  providers: [UserService, LoginService],
  directives: [ROUTER_DIRECTIVES]
})

export class SignInComponent{

  userName:string;
  completeName:string;
  email:string;
  password:string;
  password2:string;
  isArtist:boolean;
  userLogged;
  userInfo: User;
  id:number;

  constructor(private _router: Router,  private _userService: UserService,
    private _loginService: LoginService){}

  ngOnInit(){
    this.initialization();
  }

  initialization(){}

  goToIndex(){
    this._router.navigate(['Index']);
  }
    logIn(event: any){
    
        event.preventDefault();
    
        this._loginService.logIn(this.userName, this.password).subscribe(
            user => {
                this.userLogged = user;
    
                console.log(this.userLogged);
                //Save the user id
                Info.userId = this.userLogged.realId;
    
                // Save user info
    
                this._userService.getUserById(Info.userId).subscribe(
                    userInfo => {
                        this.userInfo = userInfo;
                        Info.userLogged = userInfo;
                        console.log(Info.userLogged);
                        this._router.navigate(['Artist', {id: Info.userId}])
                    },
                    error => {
                        alert("Error recibiendo información del usuario" + error)
                    }
                );
                console.log(Info.userLogged);
            },
            error => alert("Invalid user or password")
        );
    }

  signin(event: any) {
    this._userService.registerUser(this.userName, this.completeName,
        this.email, this.isArtist, this.password, this.password2).subscribe(
        response => {
          if(response.status == 200){
            this.logIn(event);
          }
        }
    )
  }


}

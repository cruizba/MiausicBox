/**
 * MiausicBox index component.
 * @component IndexComponent
 */
/// <reference path="classes/Info.ts"/>
import { Component } from 'angular2/core';
import { Router } from 'angular2/router';

import { User } from './classes/User';

import { UserService } from './services/user.service';
import { Info } from './classes/Info';
import { LoginService } from "./services/login.service";

@Component({
    selector: 'index-app',
    templateUrl: 'templates/index_app.html',
    providers: [UserService, LoginService]
})

export class IndexComponent {

    //variables from login form
    username: string;
    password: string;
    userLogged;
    userInfo: User;

    constructor(private _router: Router, private _loginService: LoginService,
                private _userService: UserService) {}

    goTo(paramsRoute: any[]){
        this._router.navigate(paramsRoute);
    }

    logIn(event: any){

        event.preventDefault();

        this._loginService.logIn(this.username, this.password).subscribe(
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

    logOut(){
        this._loginService.logOut().subscribe(
            response => {},
            error => console.log("Error when trying to log out: "+error)
        );
    }
    
    /*
    logOut() {
        this._loginService.logOut().subscribe(
            response => {
            },
            error => console.log("Error when trying to log out: " + error)
        );
    }
    */

}

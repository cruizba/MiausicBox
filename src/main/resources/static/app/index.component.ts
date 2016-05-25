/// <reference path="classes/Info.ts"/>

import { Component, OnInit, Input} from 'angular2/core';
import { Router} from 'angular2/router';

import { User } from './classes/User';

import { UserService } from './services/user.service';
import { Info } from './classes/Info';
import {LoginService} from "./services/login.service";

@Component({
    selector: 'index-app',
    templateUrl: 'templates/index_app.html',
    providers: [UserService, LoginService]
})

export class IndexComponent {
    //variables from login form
    username: string;
    password: string;

    constructor(private _router: Router, private _loginService: LoginService) { }

    goTo(paramsRoute: any[]){
        this._router.navigate(paramsRoute);
    }

    login() {

        console.log(this.username);
        console.log(this.password);

        var user:User;
        this._loginService.logIn(this.username, this.password).subscribe(
            response => {
                let obj = response.json();
                user = new User(obj.userName, obj.password, obj.completeName, obj.email, obj.description, obj.isArtist, obj.isArtist, "", "", "", [],[],[]);
                Info.userLogged = user;
                console.log(Info.userLogged)
                Info.userId = obj.id;
                console.log(Info.userId);
                this._router.navigate(['Artist', {id: Info.userId}])
            },
            error => alert("Usuario no válido")
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

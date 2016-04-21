/// <reference path="classes/Info.ts"/>

import { Component, OnInit, Input} from 'angular2/core';
import { Router} from 'angular2/router';

import { User } from './classes/User';

import { UserService } from './services/user.service';
import { Info } from './classes/Info';

@Component({
    selector: 'index-app',
    templateUrl: 'templates/index_app.html',
    providers: [UserService]
})

export class IndexComponent {
    //variables from login form
    username: string;
    password: string;

    constructor(private _router: Router,
        private _userService: UserService) { }

    goTo(paramsRoute: any[]) {
        this._router.navigate(paramsRoute);
    }

    login() {
        this._userService.getUserByIdAndPass(this.username, this.password).subscribe(
        (user => Info.userLogged = user),
        (error => alert("User Not Found"))
        );
        if(Info.userLogged != null){
            this._router.navigate(['Artist']);
        }
        else{
            $("#userLoginError").fadeIn(1000);
        }
    }



}

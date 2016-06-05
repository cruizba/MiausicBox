

import { Injectable, OnInit } from 'angular2/core';
import { Http, RequestOptions, Headers } from 'angular2/http';
import 'rxjs/Rx';

export interface User {
    id?: number;
    name: string;
}

@Injectable()
export class LoginService {

    isLogged = false;
    user:User;

    constructor(private http:Http) {
        this.reqIsLogged();
    }

    reqIsLogged() {

        /*
         let headers = new Headers({
         'X-Requested-With': 'XMLHttpRequest'
         });

         let options = new RequestOptions({headers});

         this.http.get('logIn', options).subscribe(
         response => this.processLogInResponse(response),
         error => {
         if(error.status != 401){
         console.error("Error when asking if logged: "+
         JSON.stringify(error));
         }
         }
         );
         */
    }

    private processLogInResponse(response) {
        this.isLogged = true;
        this.user = response.json();
    }

    logIn(user:string, pass:string) {


        let body = '{ "userName": "' + user +
            '", "password": "' + pass +
            '"}';
        console.log(body);
        let headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'});

        let options = new RequestOptions({headers});


        return this.http.post('logIn', body, options);
    }
}
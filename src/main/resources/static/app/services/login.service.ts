/**
 * Service of MiausicBox logged users for petitions to Api Rest
 * @class EventService
 */
import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/Rx';
import {emptyUser, toInstance} from "../classes/Utils";
import {Info} from "../classes/Info";

// FixMe?
export interface UserLogged {
    id?: number;
    name: string;
    roles: string[];
}

@Injectable()
export class LoginService {

    /* Attributes */
    isLogged = false;
    isAdmin = false;
    user = null;

    /* Constructor */
    constructor(private http: Http){
        this.reqIsLogged();
    }

    /* Methods */
    reqIsLogged(){

        let headers = new Headers({
            'X-Requested-With': 'XMLHttpRequest'
        });

        let options = new RequestOptions({headers});

        return this.http.get(Info.host +  'logIn', options).map(
            response => {
              this.processLogInResponse(response);
              return this.user;
            },
            error => {
                if(error.status != 401){
                    console.error("Error when asking if logged: "+
                        JSON.stringify(error));
                }
            }
        );
    }

    private processLogInResponse(response){
        this.isLogged = true;
        this.user = toInstance(emptyUser(), response.json());
        console.log(this.user);
        this.isAdmin = this.user.roles.indexOf("ROLE_ADMIN") !== -1;
    }

    logIn(user: string, pass: string) {

        let userPass = user + ":" + pass;

        let headers = new Headers({
            'Authorization': 'Basic '+utf8_to_b64(userPass),
            'X-Requested-With': 'XMLHttpRequest'
        });

        let options = new RequestOptions({headers});

        return this.http.get(Info.host +  'logIn', options).map(
            response => {
                this.processLogInResponse(response);
                return this.user;
            }
        );
    }

    logOut(){

        return this.http.get(Info.host +  'logOut').map(
            response => {
                this.isLogged = false;
                this.isAdmin = false;
                return response;
            }
        );
    }
}

function utf8_to_b64(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode(<any>'0x' + p1);
    }));
}

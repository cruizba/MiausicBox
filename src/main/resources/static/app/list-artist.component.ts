import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { AppComponent } from './app.component';
import {UserService} from "./services/user.service";
import {User} from "./classes/User"
import {Instrument} from "./classes/Instrument";
import {userList} from "./classes/memoryDB";
import {BandService} from "./services/band.service";
import {Http, Response, HTTP_PROVIDERS} from "angular2/http";

@Component({
  selector: 'list-artis',
  templateUrl: 'templates/listaArtistas.html',
  providers: [UserService, BandService],
  directives: [ROUTER_DIRECTIVES]
})

export class ListArtistComponent {

    userList = [];
    instruments = [];
    findUsers: User[] = [];

    bands = [];

  constructor(private _userService:UserService, private _router: Router,
                private _bandService: BandService, private http: Http){

  }

    ngOnInit () {
        console.log("Explota seguro ...");

        this._userService.getAllUsers().subscribe(
            //If we have a result
            //users => this.userList = this.deserializeAllUsers(users),
            users => {
                this.userList = this.deserializeAllUsers(users);
                console.log("FIN:");
                console.log(users);
            },
            //If an error has ocurred receiving data
            error => {
                this.userList = null;
                alert("list not found");
            }
        );

        this.instrumentsAllUsers();

        this._bandService.getBandsByUsers(this.userList).subscribe(
            bands => this.bands = bands,
            error => alert("Error bandas")
        )


    }

    instrumentsUser(user, num:number){
        /* TODO: usar instrument[] en vez de number[]
        var allInstruments:IntrumentList = new IntrumentList();
        var instrumentList = []
        for (let i = 0; i < allInstruments.instruments.length; i++) {
            if (user.userObj.instruments.indexOf(i) != -1) {
                instrumentList.push(allInstruments.instruments[i]);
            }
        }
        this.instruments[num] = ({
            "user" : user.userObj,
            "listaInst" : instrumentList
        });
        */
    }


    instrumentsAllUsers() {
        /* TODO: usar instrument[] en vez de number[]
        for(let i = 0; i < this.userList.length; i++){
            this.instrumentsUser(this.userList[i], i);
            console.log(this.instruments[i]);
        }
        */
    }
    
    findByName (name:String){
        this.userList = [];
        if(name.length != 0){
            this._userService.getUserByUserName(name).subscribe(
                users => this.userList = users,
                error => {
                    this.userList = null;
                    alert ("list not found");
                });
            this.instrumentsAllUsers();
            this._bandService.getBandsByUsers(this.userList).subscribe(
                bands => this.bands = bands,
                error => alert("Error bandas")
            )
        }
        else{
            this.ngOnInit()
        }

    }

    // Deserealization methods
    deserializeAllUsers(response:Response) {
        let body = response.json();
        console.log("Qué me traéis hoy buen señor?");
        console.log("Body ->");
        console.log(body);
        let result = [];
        body.map(
            obj => {
                var user;
                user = {"userId": obj.id, "userObj": obj};
                console.log("User >");
                console.log(user);
                result.push(user);
            }
        );
        /*for(let i = 0; i < body.length;i++){
            var user;
            user = {"userId": response[i].id, "userObj": response[i]};
            console.log("User " + i + ">");
            console.log(user);
            result.push(user);
        }*/
        console.log("Result ->");
        console.log(result);
        return result;
    }
}

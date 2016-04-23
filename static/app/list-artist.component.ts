import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { AppComponent } from './app.component';
import {UserService} from "./services/user.service";
import {User} from "./classes/User"
import {Instrument} from "./classes/Instrument";
import {IntrumentList} from "./classes/InstrumentList";
import {userList} from "./classes/memoryDB";

@Component({
  selector: 'list-artis',
  templateUrl: 'templates/listaArtistas.html',
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

export class ListArtistComponent {

    userList :User[] = [];
    instruments = [];
    findUsers: User[] = [];


  constructor(private _userService:UserService, private _router: Router){

  }

    ngOnInit () {
        this._userService.getAllUsers().subscribe(
            //If we have a result
            users => this.userList = users,
            //If an error has ocurred receiving data
            error => {
                this.userList = null;
                alert("list not found");
            });
        this.instrumentsAllUsers();

    }

    instrumentsUser(user:User, num:number){
        var allInstruments:IntrumentList = new IntrumentList();
        var instrumentList = []
        for (let i = 0; i < allInstruments.instruments.length; i++) {
            if (user.instruments.indexOf(i) != -1) {
                instrumentList.push(allInstruments.instruments[i]);
            }
        }
        this.instruments[num] = ({
            "user" : user,
            "listaInst" : instrumentList
        });
    }


    instrumentsAllUsers() {
        for(let i = 0; i < this.userList.length; i++){
            this.instrumentsUser(this.userList[i], i);
            console.log(this.instruments[i]);
        }
    }
    
    findByName (name:String){
        this.userList = [];

        this._userService.getUserByUserName(name).subscribe(
            users => this.userList = users,
            error => {
                this.userList = null;
                alert ("list not found");
            });
        
        this.instrumentsAllUsers();
    }
}

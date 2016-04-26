import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { AppComponent } from './app.component';
import {UserService} from "./services/user.service";
import {User} from "./classes/User"
import {Instrument} from "./classes/Instrument";
import {IntrumentList} from "./classes/InstrumentList";
import {userList} from "./classes/memoryDB";
import {BandService} from "./services/band.service";

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
                private _bandService: BandService){

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

        this._bandService.getBandsByUsers(this.userList).subscribe(
            bands => this.bands = bands,
            error => alert("Error bandas")
        )


    }

    instrumentsUser(user, num:number){
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
    }


    instrumentsAllUsers() {
        for(let i = 0; i < this.userList.length; i++){
            this.instrumentsUser(this.userList[i], i);
            console.log(this.instruments[i]);
        }
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
    
}

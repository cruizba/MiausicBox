import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { AppComponent } from './app.component';
import {BandService} from './services/band.service';
import {Band} from './classes/Band';
import {GenreList} from "./classes/GenreList";

@Component({
  selector: 'list-bands',
  templateUrl: 'templates/listaBandas.html',
  providers: [BandService],
    directives: [ROUTER_DIRECTIVES]
})

export class ListBandsComponent {

    bands= [];
    members = [];
    genres = [];

    constructor(private _bandService:BandService) {
    }

    ngOnInit() {
        this.initBands();
        this.members = this.initMembers();
        this.genres = this.initGenres();
        console.log(this.genres);
    }


    initBands() {
        this._bandService.getAllBands().subscribe(
            list=> this.bands = list,
            error=> {
                this.bands = null;
                alert("List not found");
            });
    }

    initMembers() {
        var result = [];
        for (let i = 0; i < this.bands.length; i++) {
            this._bandService.getMembers(this.bands[i].bandId).subscribe(
                members => result.push(members),
                error => alert("Error members")
            );
        }
        return result;
    }

    initGenres(){
        var result = [];
        var allGenres: GenreList = new GenreList();
        for(let i = 0; i < this.bands.length; i++){
            var genres = [];
            for(let j = 0; j < this.bands[i].bandObj.genres.length ;j++){
                genres.push(allGenres.genres[this.bands[i].bandObj.genres[j]]);
            }
            result.push(genres)
        }
        return result;
    }

    findName(username){
        this.bands = [];
        this.members = [];
        this.genres = [];
        if(username.length != 0){
            this._bandService.getBandByName(username).subscribe(
                bands => this.bands = bands,
                error => alert("error bands")
            );
            console.log(this.members);
            console.log(this.genres);
            this.members = this.initMembers();
            this.genres = this.initGenres();
        }
        else{
            this.initBands();
            this.members = this.initMembers();
            this.genres = this.initGenres();
        }
    }
}
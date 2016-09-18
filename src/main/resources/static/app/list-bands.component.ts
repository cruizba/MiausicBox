/**
 * MiausicBox list bands component.
 * @component ListBandsComponent
 */
import { Component } from '@angular/core';
import { BandService } from './services/band.service';

@Component({
  selector: 'list-bands',
  templateUrl: 'templates/listaBandas.html'
})

export class ListBandsComponent {

    bands= [];
    members = [];
    //genres = [];

    constructor(private _bandService:BandService) {}

    ngOnInit() {
        this.initBands();
        //this.members = this.initMembers();
        //this.genres = this.initGenres();
        //console.log(this.genres);
    }


    initBands() {
        this._bandService.getAllBands().subscribe(
            list=> {
                this.bands = list;
                console.log("getAllBands > this.bands");
                console.log(this.bands);
            },
            error=> {
                this.bands = null;
                alert("List not found");
            });
    }

    /*initMembers() {
        var result = [];
        for (let i = 0; i < this.bands.length; i++) {
            this._bandService.getMembers(this.bands[i].bandId).subscribe(
                members => result.push(members),
                error => alert("Error members")
            );
        }
        return result;
    }*/

    initGenres(){
        var result = [];
        /* TODO: utilizar genre[] en vez de number[]
        var allGenres: GenreList = new GenreList();
        for(let i = 0; i < this.bands.length; i++){
            var genres = [];
            for(let j = 0; j < this.bands[i].bandObj.genres.length ;j++){
                genres.push(allGenres.genres[this.bands[i].bandObj.genres[j]]);
            }
            result.push(genres)
        }
        */
        return result;
    }

    findName(bandName){
        this.bands = []
        this._bandService.getBandByName(bandName).subscribe(
            result => this.bands = result
        )
    }

}

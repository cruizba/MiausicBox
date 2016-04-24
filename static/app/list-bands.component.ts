import { Component, Input, OnInit } from 'angular2/core';
import { Router} from 'angular2/router';
import { AppComponent } from './app.component';
import {BandService} from './services/band.service';
import {Band} from './classes/Band';

@Component({
  selector: 'list-bands',
  templateUrl: 'templates/listaBandas.html',
  providers: [BandService]
})

export class ListBandsComponent {

  bands: Band[]=[];

  constructor (private _bandService:BandService){}

  ngOnInit () {
    this._bandService.getAllBands().subscribe(
        list=> this.bands = list,
        error=> {
          this.bands = null;
          alert("List not found");
        });
  }

}

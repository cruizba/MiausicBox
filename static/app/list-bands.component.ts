import { Component, Input, OnInit } from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import { AppComponent } from './app.component';
import {Band} from './classes/Band';
import {BandService} from './services/band.service';
import {Band} from './classes/Band';

@Component({
  selector: 'list-bands',
  templateUrl: 'templates/listaBandas.html',
  providers: [BandService],
    directives: [ROUTER_DIRECTIVES]
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

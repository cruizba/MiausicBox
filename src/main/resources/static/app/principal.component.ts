/**
 * Created by Carlos on 24/08/2016.
 */
/**
 * MiausicBox principal component.
 * @component PrincipalComponent
 */
import { Component } from '@angular/core';
import { BandService } from './services/band.service';
import { UserService } from "./services/user.service";
import { BlogService } from "./services/blog.service";
import { PrincipalService } from "./services/principal.service";
import { BlogUser } from "./classes/BlogUser";
import { BlogBand } from "./classes/BlogBand";
import { Novelty } from "./classes/Novelty";
import { Event } from "./classes/Event"
import { Info } from "./classes/Info";

@Component({
  selector: 'principal',
  templateUrl: 'templates/principal.html'
})

export class PrincipalComponent {

  id;
  novedades = [];

  constructor(private _principalService: PrincipalService){}

  ngOnInit() {
    this.initialization();
  }

  initialization(){
    //Hell Call
    this._principalService.getHell(Info.userId).subscribe(
      data => {
        // FixMe: move deserializeMethods to principal.service.ts
        this.saveNovedades(data[0]);
        this.saveNovedades(data[1]);
        this.saveNovedades(data[2]);
        this.saveNovedades(data[3]);
        this.novedades.sort(function(a,b) {
          return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
        });
        console.log("Muchas cosas chulas");
        console.log(this.novedades);
      },
      error => console.log(error)
    );
  }

  parseOne(obj):number{
    if (obj instanceof BlogUser){
      return 0;
    } else if (obj instanceof BlogBand){
      return 1;
    } else if (obj instanceof Event){
      return 2;
    } else if (obj instanceof Novelty) {
      return 3;
    } else {
      return 4;
    }
  }

  saveNovedades(list){
    list.map(
      obj => this.novedades.push(obj)
    )
  }

}

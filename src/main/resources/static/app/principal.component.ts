/**
 * MiausicBox principal component.
 * @component PrincipalComponent
 */
import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
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
  templateUrl: 'templates/principal.html',
  providers: [BandService, UserService, BlogService, PrincipalService],
  directives: [ROUTER_DIRECTIVES]
})

export class PrincipalComponent {

  novedades = [];
  id;

  constructor(private _principalService: PrincipalService){}

  ngOnInit() {
    this.initialization();
  }

  initialization(){
    //Hell Call
    this._principalService.getHell(Info.userId).subscribe(
      data => {
        // FixMe: move deserializeMethods to principal.service.ts
        this.deserializeBlogUserList(data[0]);
        this.deserializeBlogBandList(data[1]);
        this.deserializeNoveltyList(data[2]);
        this.deserializeEventList(data[3]);
        // Deserialize methods push obj to novedades
        this.novedades.sort(function(a,b) {
            return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
        });
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

    // Deserialize methods FixMe: move deserialize methods to principal service
    deserializeBlogUserList(list) {
        list.map(
            obj => {
                var blog:BlogUser = new BlogUser(0,obj.name,obj.image,obj.text,obj.date,obj.author); //<--- FixMe: ID
                blog.date = new Date(obj.date);
                this.novedades.push(blog);
            }
        )
    }

    deserializeBlogBandList(list) {
        list.map(
            obj => {
                var blog:BlogBand = new BlogBand(0, obj.name,obj.image,obj.text,obj.date,obj.author); //<--- FixMe: ID
                blog.date = new Date(obj.date);
                this.novedades.push(blog);
            }
        )
    }

    deserializeNoveltyList(list) {
        list.map(
            obj => {
                var nov:Novelty = new Novelty(0, obj.user,obj.band,obj.date,obj.joined); //<--- FixMe: ID
                nov.date = new Date(obj.date);
                this.novedades.push(nov);
            }
        )
    }

    deserializeEventList(list) {
        list.map(
            obj => {
                var eve:Event = new Event(0, obj.name, obj.date, null, obj.description, obj.bands, // <--- FixMe: ID
                obj.direction,[]);
                eve.date = new Date(obj.date);
                this.novedades.push(eve);
            }
        )
    }

}

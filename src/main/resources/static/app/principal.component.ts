import { Component } from 'angular2/core';
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { BandService } from './services/band.service';
import { UserService } from "./services/user.service";
import { BlogService } from "./services/blog.service";
import {PrincipalService} from "./services/principal.service";
import {BlogUser} from "./classes/BlogUser";
import {BlogBand} from "./classes/BlogBand";
import {Novelty} from "./classes/Novelty";
import {Event} from "./classes/Event"
import {Info} from "./classes/Info";


@Component({
  selector: 'principal',
  templateUrl: 'templates/principal.html',
  providers: [BandService, UserService, BlogService, PrincipalService],
  directives: [ROUTER_DIRECTIVES]
})

export class PrincipalComponent {
  novedades = [];
  id;

  constructor(private _routeParams: RouteParams, private _bandService: BandService, private _blogService: BlogService,
              private _userService: UserService, private _principalService: PrincipalService){
  }

  ngOnInit() {
    this.initialization();
  }

  initialization(){
    //Hell Call
    this._principalService.getHell(Info.userId).subscribe(
        data => {
          this.deserializeBlogUserList(data[0]);
          this.deserializeBlogBandList(data[1]);
          this.deserializeNoveltyList(data[2]);
          this.deserializeEventList(data[3]);
          this.novedades.sort(function(a,b) {
              return new Date(b.date.toString()).valueOf() - new Date(a.date.toString()).valueOf();
          });
          console.log("call:");
          console.log(this.novedades);
          console.log("HellCall <<<<<<<<<<<<<<<<<<<<<<");
        },
        error => console.log(error)
    );
  }

  parseOne(obj):number{
    if (obj instanceof BlogUser){
      console.log("Es un BlogUser");
      return 0;
    } else if (obj instanceof BlogBand){
      console.log("Es un BlogBand");
      return 1;
    } else if (obj instanceof Event){
      console.log("Es un Event");
      return 2;
    } else if (obj instanceof Novelty) {
      console.log("Es un Novelty");
      return 3;
    } else {
      console.log("Cthulhu");
      return 4;
    }
  }

    // Deserialize methods
    deserializeBlogUserList(list) {
        list.map(
            obj => {
                var blog:BlogUser = new BlogUser(obj.name,obj.image,obj.text,obj.date,obj.author);
                blog.date = new Date(obj.date);
                this.novedades.push(blog);
            }
        )
    }

    deserializeBlogBandList(list) {
        list.map(
            obj => {
                var blog:BlogBand = new BlogBand(obj.name,obj.image,obj.text,obj.date,obj.author);
                blog.date = new Date(obj.date);
                this.novedades.push(blog);
            }
        )
    }

    deserializeNoveltyList(list) {
        list.map(
            obj => {
                var nov:Novelty = new Novelty(obj.user,obj.band,obj.date,obj.joined);
                nov.date = new Date(obj.date);
                this.novedades.push(nov);
            }
        )
    }

    deserializeEventList(list) {
        list.map(
            obj => {
                var eve:Event = new Event(obj.name, obj.date, null, obj.description, obj.bands,
                obj.direction,[]);
                eve.date = new Date(obj.date);
                this.novedades.push(eve);
            }
        )
    }

}

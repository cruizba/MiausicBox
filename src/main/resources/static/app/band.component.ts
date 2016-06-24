/**
 * MiausicBox band component.
 * @component BandComponent
 */
import { Component } from 'angular2/core';
import { UserService } from './services/user.service';
import { User } from './classes/User'
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Info } from "./classes/Info";
import { Instrument } from "./classes/Instrument";
import { FollowService } from "./services/follow.service";
import { BlogBand } from "./classes/BlogBand";
import { BlogService } from "./services/blog.service"
import { BandService } from './services/band.service'
import { Band } from './classes/Band'
import { NoveltyService } from "./services/novelty.service";

@Component({
  selector: 'band',
  templateUrl: 'templates/banda.html',
  providers: [BandService, UserService, FollowService, BlogService, NoveltyService],
  directives: [ROUTER_DIRECTIVES]
})

export class BandComponent {

  isAdmin:boolean;
  isMember:boolean;
  band:Band;
  events: Event[] = [];  
  id;
  blogList:BlogBand[] = [];
  instruments: Instrument[] = [];
  numFollowers:number;
  followers:User[]=[];
  isFollower:boolean;

  constructor(private _routeParams: RouteParams, private _bandService: BandService,
              private _noveltyService: NoveltyService){
  }

  ngOnInit() {
    this.initialization();
    this.genres();
  }

  initialization() {
    // Get id from route
    this.id = this._routeParams.get('id')

    this._bandService.getBandById(this.id).subscribe(
      result => {
        this.band = result;
        console.log("Bien jajaja esta es la banda >");
        console.log(this.band);
        console.log("Y este userLogged >>");
        console.log(Info.userLogged);

        this.isAdmin = (this.band.administrador.equals(Info.userLogged));
        console.log("OK, ~(u_u)~");

        this.isMember = (this.band.isMember(Info.userLogged));
        this.isFollower = (this.band.isFollower(Info.userLogged));
        this.numFollowers = (this.band.followers.length);

        console.log("Booleans: 1)isAdmin, 2)isMember, 3)isFollower");
        console.log(this.isAdmin);
        console.log(this.isMember);
        console.log(this.isFollower);
      }
    );

    this._bandService.getEventByBandById(this.id).subscribe(
      result => this.events = result
    );

    this._bandService.getBlogsByBand(this.id).subscribe(
      result => this.blogList = result
    );
  }

  genres(){
    /* TODO: utilizar genre[] en vez de number[]
    var allGenres:GenreList = new GenreList();
    for(let i = 0; i < allGenres.genres.length; i++){
        if(this.band.genres.indexOf(i) != -1){
            this.genresBand.push(allGenres.genres[i].name);
            console.log(allGenres.genres[i].name);
        }
    }
    */
  }

  /*updateFollows(){
    this.numFollowers = this.band.followers.length;
  }*/

  followBand() {
    this._bandService.addFollowBand(this.id, Info.userId).subscribe(
      result => {
        console.log("Veamos>");
        console.log(result.json());
        this.isFollower = result.json();
        if(!result) {
          this.band.followers.push(Info.userLogged);
        } else {
          this.band.followers.splice(this.band.followers.indexOf(Info.userLogged),-1);
        }
      }
    );
  }
    
  newMember(userName){
    this._bandService.addNewMember(userName, this.id);
    /*this._bandService.getMembers(this.id).subscribe(
      (members => this.membersList = members),
      (error => alert("getMembers error"))
    )*/
    this._noveltyService.newNovelty(userName, this.band, new Date(), true);
  }

  newTrack (name, group, link){
    this._bandService.addNewTrack(name, group, link, this.id);
    this._bandService.getBandById(this.id).subscribe(
      (band => this.band = band),
      (error => alert("getBandById error"))
    );
  }

}

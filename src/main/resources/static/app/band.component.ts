import { Component, OnInit } from 'angular2/core';
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
import {NoveltyService} from "./services/novelty.service";

@Component({
  selector: 'band',
  templateUrl: 'templates/banda.html',
  providers: [BandService, UserService, FollowService, BlogService, NoveltyService],
  directives: [ROUTER_DIRECTIVES]
})

export class BandComponent {

  isAdmin:boolean;
  band:Band;
  events: Event[] = [];  
  id;
  blogList:BlogBand[] = [];
  //membersList: User[];
  instruments: Instrument[] = [];

  //Follows variables
  //numFollowers:number;

  constructor(private _routeParams: RouteParams, private _bandService: BandService,
              private _blogService: BlogService, private _userService:UserService,
              private _noveltyService: NoveltyService){
  }

  ngOnInit() {
      this.initialization();
      this.genres();
  }


    initialization(){
        // Get id from route
        this.id = this._routeParams.get('id')

        //console.log("Band groupname antes de peticion:");
        //console.log(this.band.groupName);
        this._bandService.getBandById(this.id).subscribe(
            result => {
                this.band = result;
                console.log("Bien jajaja esto tenemos >");
                console.log(this.band.groupName);
            })
        this._bandService.getEventByBandById(this.id).subscribe(
            result => this.events = result
        );



        // Check if is admin to show edit buttons
        /*this._bandService.isAdmin(this.id, Info.userLogged).subscribe(
          (isAdmin => this.isAdmin = isAdmin),
          (error => alert("getAdmin error"))
        )*/

        // Get band information
        /*this._bandService.getBandById(this.id).subscribe(
          (band => this.band = band),
          (error => alert("getBandById error"))
        )*/

        // Get members
        /*this._bandService.getMembers(this.id).subscribe(
          (members => this.membersList = members),
          (error => alert("getMembers error"))
        )*/

        //this.updateFollows();

        //var inss = new IntrumentList();
        //this.instruments = inss.instruments;

        /*this._blogService.getBlogsByBand(this.band).subscribe(
          (blogList => this.blogList = blogList),
          (error => alert("getBlogsByBand error"))
        )*/
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
        )
    }

}

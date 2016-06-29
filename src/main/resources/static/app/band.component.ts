/**
 * MiausicBox band component.
 * @component BandComponent
 */
import { Component } from 'angular2/core';
import { UserService } from './services/user.service';
import { User } from './classes/User'
import { Event } from './classes/Event'
import {RouteParams, ROUTER_DIRECTIVES, Router} from 'angular2/router';
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

  id;
  isAdmin:boolean;
  isMember:boolean;
  band:Band;
  events: Event[] = [];
  blogList:BlogBand[] = [];
  instruments: Instrument[] = [];
  numFollowers:number;
  followers:User[]=[];
  isFollower:boolean;
  trackLink:string;

  regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/g;

  constructor(private _router: Router, private _routeParams: RouteParams,
              private _bandService: BandService, private _blogService: BlogService, private _noveltyService: NoveltyService){
  }

  ngOnInit() {
    this.initialization();
  }

  initialization() {
    // Get id from route
    this.id = this._routeParams.get('id')

    this._bandService.getBandById(this.id).subscribe(
      result => {
        this.band = result;
        this.setBooleanAttributes();
      }
    );

    this._bandService.getEventByBandById(this.id).subscribe(
      result => this.events = result
    );

    this._bandService.getBlogsByBand(this.id).subscribe(
      result => this.blogList = result
    );
  }

  setBooleanAttributes(){
    this.isAdmin = this.band.administrador.equals(Info.userLogged);
    this.isMember = this.band.isMember(Info.userLogged);
    this.isFollower = this.band.isFollower(Info.userLogged);
    this.numFollowers = this.band.followers.length;
  }

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
    this._bandService.addNewMember(userName, new Date(), this.id).subscribe(
      response => {
        if (response.status == 200) {
          this._bandService.getBandById(this.id).subscribe(
            band => this.band = band,
            error => alert("getBandById error")
          );
        } else {
            console.log(response.status);
        }
      },
      error => console.log(error)
    );
  }

  newTrack (name, band, link){
    let embedLink:string = "";
    if(link != "") {
      if(!this.regex.test(link)){
        alert("Invalid YouTube link. No link will be set.");
      } else {
        embedLink = this.parseLink(link);
      }
    }
    this._bandService.addNewTrack(name, band, embedLink, this.id).subscribe(
      response => {
        if (response.status == 200) {
          this._bandService.getBandById(this.id).subscribe(
            band => this.band = band,
            error => alert("getBandById error")
          );
        } else {
          console.log(response.status);
        }
      },
      error => console.log(error)
    );
  }

  removeTrack(trackId){
    this._bandService.removeTrack(this.id, trackId).subscribe(
      response => {
        if (response.status == 200) {
          this._bandService.getBandById(this.id).subscribe(
            band => this.band = band,
            error => alert("getBandById error")
          );
        } else {
          console.log(response.status);
        }
      },
      error => console.log(error)
    );
  }

  removeMember(memberId){
    this._bandService.removeMember(this.id, memberId).subscribe(
      response => {
        if (response.status == 200) {
          this._bandService.getBandById(this.id).subscribe(
            band => {
              this.band = band;
              if (band.members.length == 0) {
                this.goToProfile();
              } else {
                this.setBooleanAttributes();
              }
            },
            error => alert("getBandById error")
          );
        } else {
          console.log(response.status);
        }
      },
      error => console.log(error)
    );
  }

  removeBand(){
    this._bandService.removeBand(this.id).subscribe(
      response => {
        if (response.status == 200) {
          this.goToProfile();
        }
      },
      error => console.log(error)
    );
  }

  submitBlog(title, img, text){
    this._blogService.addBlogBand(title, img, text, new Date, this.id).subscribe(
      response => {
        if (response.status == 200){
          this._bandService.getBlogsByBand(this.id).subscribe(
            blogList => this.blogList = blogList,
            error => alert("getBandById error")
          )
        } else {
          console.log(response.status);
        }
      },
      error => console.log(error)
    );
  }

  goToProfile(){
    this._router.navigate(['Artist', {id: Info.userId}]);
  }

  parseLink(link){
    var res:string[] = link.split("/");
    var response:string = "";
    for(var i = 0; i < res.length - 1; i++){
        response += res[i];
        response += "/";
    }
    response += "v/" + res[res.length - 1];
    return response;
  }

  setYouTubeTrack(track){
      this.trackLink = track;
  }

  itsMe(mem:User):boolean{
    return mem.equals(Info.userLogged);
  }

}

import { Component, OnInit } from 'angular2/core';
import { UserService } from './services/user.service';
import { User } from './classes/User'
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Info } from "./classes/Info";
import { Instrument } from "./classes/Instrument";
import { IntrumentList } from "./classes/InstrumentList";
import { GenreList } from "./classes/GenreList";
import { FollowService } from "./services/follow.service";
import { BlogBand } from "./classes/BlogBand";
import { BlogService } from "./services/blog.service"
import { BandService } from './services/band.service'
import { Band } from './classes/Band'

@Component({
  selector: 'band',
  templateUrl: 'templates/banda.html',
  providers: [BandService, UserService, FollowService, BlogService],
  directives: [ROUTER_DIRECTIVES]
})

export class BandComponent {

  isUserLogged: boolean;
  user: User;
  band: Band;
  genresBand:string[] = [];
  id;
  blogList:BlogBand[] = [];
  membersList: User[];
  followersList: User[];

  //Follows variables
  numFollowing:number;
  numFollowers:number;

  constructor(private _routeParams: RouteParams, private _userService: UserService,
                private _followService: FollowService, private _blogService: BlogService){
  }

  ngOnInit() {
      this.initialization();
      this.genres();
  }


    initialization(){
        //Get id from route
        this.id = this._routeParams.get('id')

        //Check if is userLogged to show edit buttons
        this.isUserLogged = (this.id == Info.userId);

        //Get user information
        this._userService.getUserById(this.id).subscribe(
            user => this.user = user
        )

        this.updateFollows();
        this._blogService.getBlogsByBand(this.band).subscribe(
          blogList => this.blogList = blogList
        )
    }

    genres(){
        var allGenres:GenreList = new GenreList();
        for(let i = 0; i < allGenres.genres.length; i++){
            if(this.user.genres.indexOf(i) != -1){
                this.genresBand.push(allGenres.genres[i].name);
                console.log(allGenres.genres[i].name);
            }
        }
    }

    goToURL (){
      console.log(this.user.twitter);
      console.log("Entro en click");
      window.open(this.user.twitter);
    }

    updateFollows(){
        this._followService.getNumFollowersById(this.id).subscribe(
            (followers => this.numFollowers = followers),
            (error => alert("numFollowers error"))
        )
        this._followService.getNumFollowingByID(this.id).subscribe(
            (followings => this.numFollowing = followings),
            (error => alert("numFollowings error"))
        );
    }


}

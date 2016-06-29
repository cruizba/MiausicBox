// FixMe: refactorice name of class to UserComponent
/**
 * MiausicBox profile component.
 * @component ProfileComponent
 */
import { Component } from 'angular2/core';
import { UserService } from './services/user.service';
import { User } from './classes/User'
import { RouteParams, ROUTER_DIRECTIVES } from 'angular2/router';
import { Info } from "./classes/Info";
import { FollowService } from "./services/follow.service";
import { MessageService } from "./services/message.service";
import { BlogUser } from "./classes/BlogUser";
import { BlogService } from "./services/blog.service";
import { BandService } from "./services/band.service";
import { EventService } from "./services/event.service";
import { Genre } from "./classes/Genre";
import { Instrument } from "./classes/Instrument";
import { Band } from "./classes/Band";
import { Event } from "./classes/Event";


@Component({
  selector: 'artista',
  templateUrl: 'templates/artista.html',
  providers: [UserService, FollowService, MessageService, BlogService, BandService, EventService],
  directives: [ROUTER_DIRECTIVES]
})

export class ArtistaComponent {

  isUserLogged: boolean;
  isArtist: boolean;
  isFollowed: boolean;
  user: User;
  id;
  blogList:BlogUser[] = [];
  genreList:Genre[] = [];
  instrList:Instrument[] = [];
  events:Event[] = [];
  bandList:Band[] = [];

  //Follows variables
  numFollowing:number;
  numFollowers:number;

  //Notification
  numMessages:number;

  //Variables modify
  instrument;
  genre;

  constructor(private _routeParams: RouteParams, private _userService: UserService,
                private _followService: FollowService, private _messageService: MessageService,
                private _bandService:BandService, private _blogService: BlogService,
                private _eventService:EventService){
  }

  ngOnInit() {

      this.initialization();
  }

    initialization(){

        //Get id from route
        this.id = this._routeParams.get('id')

        //Check if is userLogged to show edit buttons
        this.isUserLogged = (this.id == Info.userId);

        //Get user information
        this._userService.getUserById(this.id).subscribe(
            user => {
                this.user = user;
                //Check if is an artist
                this.isArtist = this.user.isArtist;
                this.isFollowedBy();
            }
        );

        this._userService.getAllGenres().subscribe(
          genres => {
              this.genreList = genres;
          }
        );

        this._userService.getAllInstruments().subscribe(
            instruments => {
                this.instrList = instruments;
                console.log(this.instrList);
            }
        );

        this._eventService.getEventsByUserId(this.id).subscribe(
          events => {
              this.events = events;
              console.log(this.events);
          }
        );

        this.updateFollows();

        this._messageService.getNumNonRead(Info.userId).subscribe(
            (num => this.numMessages = num),
            (error => alert("Error notifications"))
        );

        this._userService.getBlogsByUser(this.id).subscribe(
            blogList => this.blogList = blogList
        );

    }

    goToURL (link){
      window.open(link);
    }

    updateFollows(){
        this._followService.getNumFollowersById(this.id).subscribe(
            (followers => {
                this.numFollowers = followers;
                console.log(this.numFollowers);
            }),
            error => alert("numFollowers error")
        );
        this._followService.getNumFollowingByID(this.id).subscribe(
            (followings => {
                this.numFollowing = followings;
                console.log(this.numFollowing);
            }),
            (error => alert("numFollowings error"))
        );
    }

    isFollowedBy() {
      this._followService.isUserFollowedBy(Info.userId, this.id).subscribe(
        (followed => this.isFollowed = followed),
        (error => alert("isUserFollowedBy error"))
      );
    }

    setFollow() {
      this._followService.setFollow(Info.userId, this.user.id).subscribe(
          response => {
              this.isFollowed = true;
              this.numFollowers++;
          },
          error => alert("Error following")
      );
    }

    setUnfollow() {
      this._followService.setUnfollow(Info.userId, this.user.id).subscribe(
          response => {
              this.isFollowed = false;
              this.numFollowers--;
          },
          error => alert("Error unfollowing")
      );
    }

    submitBlog(title, img, text){
        var user: User=Info.userLogged;
        this._blogService.addBlogUser(title, img, text, new Date, user).subscribe(
            response => {
                if (response.status == 200){
                    console.log("ok, vamos a ver si se ha guardado ...")
                    this._userService.getBlogsByUser(this.id).subscribe(
                        blogList => this.blogList = blogList
                    )
                } else {
                    console.log(response.status);
                }
            },
            error => console.log(error)
        );
    }
    
    newBand (nameBand, description){
        var user: User=Info.userLogged;
        this._bandService.addNewBand(user, nameBand,description).subscribe(
            response =>{
              if(response.status == 200){
                  this._userService.getUserById(this.user.id).subscribe(
                      response => this.user = response
                  )
              }
            },
            error => console.log("Banda no recibida")
        );
        console.log("no peto");
    }

    newEvent (name, date, direction, description){
        var auxdate = new Date (date).toDateString();
        this._eventService.addNewEvent(name, auxdate, direction, description).subscribe(
            response => {
                if (response.status == 200){
                    console.log("EVENTO RECIBIDO")
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    );
                    this._eventService.getEventsByUserId(this.id).subscribe(
                        events => this.events = events
                    );
                }
            }
        );
    }
    
    editCity(city){
        this._userService.setCity(city).subscribe(
        	response => {
        		if(response.status == 200){
        			this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    )
        		}	
        	},
        	error => alert("No se ha podido editar el campo")
        );
    }

    addGenre(genre){
        let genreAux:Genre = new Genre(genre);
        this._userService.addGenre(genreAux).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    );
                }
                else{
                    alert("El genero ya está añadido");
                }
            },
            error => alert("El genero ya está añadido")
        );
    }

    deleteGenre(genre){
        let genreAux:Genre = new Genre(genre);
        this._userService.deleteGenre(genreAux).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    );
                }
                else{
                    alert("El genero no está añadido");
                }
            },
        error => alert("El genero no está añadido")
        );
    }
    
    addInstrument(inst){
        this._userService.addInstrument(inst).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    );
                } 
            },
            error => alert("El instrumento ya esta añadido")
        )
    }

    deleteInstrument(inst){
        this._userService.deleteInstrument(inst).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    );
                }
            },
            error => alert("El instrumento no está añadido")
        )
    }

    setYoutube(link){
        this._userService.setYoutube(link).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    )
                }
            },
            error => alert("No se ha podido editar el campo")
        )
    }
    
    setTwitter(link){
        this._userService.setTwitter(link).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    )
                }
            },
            error => alert("No se ha podido editar el campo")
        )
    }

    setFacebook(link){
        this._userService.setFacebook(link).subscribe(
            response => {
                if(response.status == 200){
                    this._userService.getUserById(this.id).subscribe(
                        user => this.user = user
                    )
                }
            },
            error => alert("No se ha podido editar el campo")
        )
    }
    
    
    //addInstrument(num){
    //    this._userService.setInstrument(num);
    //    this.instrumentsUser();
    //}

    //deleteInstrument(num){
    //    this._userService.deleteInstrument(num);
    //    this.instrumentsUser();
   // }

}

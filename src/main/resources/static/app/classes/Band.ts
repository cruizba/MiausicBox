/**
 *  Class that represent the information related to MiausicBox bands
 *  @class Band
 */
import {User} from './User';
import {Track} from "./Track";
import {Genre} from "./Genre";

export class Band{

  /* Attributes */
  private _id: number;
  private _administrador: User;
  private _groupName: string;
  private _description: string;
  private _city: string;
  private _web: string;
  private _facebook: string;
  private _twitter: string;
  private _youtube: string;
  private _members: User[];
  private _followers: User[];
  private _genres: Genre[];
  private _tracks:Track[];

  /* Constructor */
  constructor(id:number, administrador:User, groupName:string, description: string, city:string,
              web:string, facebook:string, twitter:string, youtube:string,
              members:User[], followers:User[], genres:Genre[], tracks:Track[]){
    this._id = id;
    this._administrador = administrador;
    this._groupName = groupName;
    this._description = description;
    this._city = city;
    this._web = web;
    this._facebook = facebook;
    this._twitter = twitter;
    this._youtube = youtube;
    this._members = members;
    this._followers = followers;
    this._genres = genres;
    this._tracks = tracks;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get administrador():User {
    return this._administrador;
  }

  get groupName():string {
    return this._groupName;
  }

  get description():string {
    return this._description;
  }

  get city():string {
    return this._city;
  }

  get web():string {
    return this._web;
  }

  get facebook():string {
    return this._facebook;
  }

  get twitter():string {
    return this._twitter;
  }

  get youtube():string {
    return this._youtube;
  }

  get members():User[] {
    return this._members;
  }

  get followers():User[] {
    return this._followers;
  }

  get genres():Genre[] {
    return this._genres;
  }

  get tracks():Track[] {
    return this._tracks;
  }

  set id(id:number) {
    this._id = id;
  }

  set administrador(administrador:User) {
    this._administrador = administrador;
  }

  set groupName(groupName:string) {
    this._groupName = groupName;
  }

  set description(description:string) {
    this._description =  description;
  }

  set city(city:string) {
    this._city= city;
  }

  set web(web:string) {
    this._web = web;
  }

  set facebook(facebook:string) {
    this._facebook = facebook;
  }

  set twitter(twitter:string) {
    this._twitter = twitter;
  }

  set youtube(youtube: string) {
    this._youtube = youtube;
  }

  set members(members:User[]) {
    this._members = members;
  }

  set followers(followers:User[]) {
    this._followers = followers;
  }

  set genres(value:Genre[]) {
    this._genres=value;
  }

  set tracks(tracks:Track[]) {
    this._tracks=tracks;
  }

  /** Return if a Band is equal to other
   *  @method equals
   *  @param {object} any
   */
  equals(object:any):boolean {
    if (!(object instanceof Band)) {
      return false;
    } else {
      console.log("uoooh (~^.^)~");
      var band:Band = object;
      return band.groupName == this.groupName;
    }
  }

  /** Return if Band Members contains a User
   *  @method isMember
   *  @param {user} User
   */
  isMember(user:User):boolean {
    var found = false;
    for (var i = 0; i < this.members.length; i++) {
      if (this.members[i].equals(user)) {
        found = true;
        break;
      }
    }
    return found;
  }

  /** Return if Band Followers contains a User
   *  @method isFollower
   *  @param {user} User
   */
  isFollower(user:User):boolean {
    var found = false;
    for (var i = 0; i < this.followers.length; i++) {
      if (this.followers[i].equals(user)) {
        found = true;
        break;
      }
    }
    return found;
  }

  /** Return if Band has a Genre
   *  @method hasGenre
   *  @param {genre} Genre
   */
  hasGenre(genre:Genre):boolean {
    var found = false;
    for (var i = 0; i < this.genres.length; i++) {
      if (this.genres[i].equals(genre)) {
        found = true;
        break;
      }
    }
    return found;
  }

  /** Return if Band has a Track
   *  @method hasTrack
   *  @param {track} Track
   */
  hasTrack(track:Track):boolean {
    var found = false;
    for (var i = 0; i < this.tracks.length; i++) {
      if (this.tracks[i].equals(track)) {
        found = true;
        break;
      }
    }
    return found;
  }

}

import {User} from './User';
import {Track} from "./Track";
import {Genre} from "./Genre";

export class Band{

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

  constructor(administrador:User, groupName:string, description: string, city:string, web:string, facebook:string,
              twitter:string, youtube:string, members:User[], followers:User[], genres:Genre[], tracks:Track[]){
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
  };

  public get administrador():User{
    return this._administrador;
  }

  public get groupName():string{
    return this._groupName;
  }

  public get description():string{
    return this._description;
  }

  public get city():string{
    return this._city;
  }

  public get web():string{
    return this._web;
  }

  public get facebook():string{
    return this._facebook;
  }

  public get twitter():string{
    return this._twitter;
  }

  public get cleyoutube():string{
    return this._youtube;
  }

  public get members():User[]{
    return this._members;
  }

  public get followers():User[]{
    return this._followers;
  }

  public get genres():Genre[]{
    return this._genres;
  }

  public get tracks():Track[]{
    return this._tracks;
  }

  public set administrador(administrador:User){
    this._administrador = administrador;
  }

  public set groupName(groupName:string){
    this._groupName = groupName;
  }

  public set description(description:string){
    this._description =  description;
  }

  public set city(city:string){
    this._city= city;
  }

  public set web(web:string){
    this._web = web;
  }

  public set facebook(facebook:string){
    this._facebook = facebook;
  }

  public set twitter(twitter:string){
    this._twitter = twitter;
  }

  public set youtube(youtube: string){
    this._youtube = youtube;
  }

  public set genres(value:Genre[]){
    this._genres=value;
  }

  public set tracks(tracks:Track[]){
    this._tracks=tracks;
  }



  /** Return if a Band is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Band)){
      return false;
    }
    else{
      var band:Band = object;
      return band.groupName == this.groupName;
    }
  }

}

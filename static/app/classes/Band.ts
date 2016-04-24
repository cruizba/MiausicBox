import {User} from './User';

export class Band{
  private _administrador: User;
  private _groupName: string;
  private _city: string;
  private _web: string;
  private _facebook: string;
  private _twitter: string;
  private _youtube: string;
  private _members: User[];
  private _followers: User[];

  constructor(administrador:User, groupName:string, city:string, web:string, facebook:string,
              twitter:string, youtube:string){
    this._administrador = administrador;
    this._groupName = groupName;
    this._city = city;
    this._web = web;
    this._facebook = facebook;
    this._twitter = twitter;
    this._youtube = youtube;
    this._members = [];
    this._followers = [];
  };

  public get administrador():User{
    return this._administrador;
  }

  public get groupName():string{
    return this._groupName;
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

  public get youtube():string{
    return this._youtube;
  }

  public get members():User[]{
    return this._members;
  }

  public get followers():User[]{
    return this._followers;
  }

  public set administrador(administrador:User){
    this._administrador = administrador;
  }

  public set groupName(groupName:string){
    this._groupName = groupName;
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

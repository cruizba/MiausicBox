import {Band} from './Band'
import {Instrument} from "./Instrument";
import {Genre} from "./Genre";
/**
 * Class that represent the information related to MiausicBox users
 * @class User
 */
export class User{
  
  private _userName:string;
  private _password:string;
  private _completeName:string;
  private _email:string;
  private _description:string;
  private _isArtist: boolean;
  private _city:string;
  private _facebook:string;
  private _twitter:string;
  private _youtube:string;
  private _instruments:Instrument[] = [];
  private _genres:Genre[] = [];
  private _bands: Band[] = [];
  private _events:Event[] = [];

  constructor(userName:string, password:string, completeName:string, email:string,
              description:string, isArtist:boolean, city:string,
              facebook:string, twitter:string, youtube:string,
              instruments:Instrument[], genres:Genre[], bands: Band[], events: Event[]){
    this._userName = userName;
    this._password = password;
    this._completeName = completeName;
    this._email = email;
    this._description = description;
    this._isArtist = isArtist;
    this._city = city;
    this._instruments = instruments;
    this._genres = genres;
    this._bands = bands;
    this._events = events;
  }

  /* Methods Getters & Setters*/
  public get userName():string{
    return this._userName;
  }

  public get password():string{
    return this._password;
  }

  public get completeName():string{
    return this._completeName;
  }

  public get email():string{
    return this._email;
  }

  public get description():string{
    return this._description;
  }

  public get isArtist():boolean{
    return this._isArtist;
  }

  public get instruments(): Instrument[]{
    return this._instruments;
  }

  public get genres(): Genre[]{
    return this._genres;
  }


  public get city():string{
    return this._city;
  }

  public get facebook():string{
    return this._facebook;
  }

  public get twitter():string{
    return this._twitter;
  }

  public get youtube():string{
    return this._youtube;  }

  get bands():Band[]{
    return this._bands;
  }

  get events():Event[]{
    return this._events;
  }

  public set instruments(instrument: Instrument[]){
    this._instruments = instrument;
  }

  public set genres(genres:Genre[]){
    this._genres=genres;
  }

  public set userName(userName: string){
    this._userName = userName;
  }

  public set password(password: string){
    this._password = password;
  }

  public set completeName(completeName: string){
    this._completeName = completeName;
  }

  public set email(email:string){
    this._email = email;
  }

  public set description(description: string){
    this._description = description
  }

  public set isArtist(isArtist:boolean){
    this._isArtist = isArtist;
  }

  public setCity(city:string){
    this._city = city;
  }

  public setFacebook(facebook:string){
    this._facebook = facebook;
  }

  public setTwitter(twitter:string){
    this._twitter = twitter;
  }

  public setYoutube(youtube:string){
    this._youtube = youtube;
  }

  set bands(value:Band[]){
    this._bands=value;
  }
  set events(value:Event[]){
    this._events=value;
  }


  /** Return if an User is equal to other
    @method equals
    @param {User} User
  */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof User)){
      return false;
    }
    else{
      var user:User = object;
      return (user.userName == this.userName);
    }
  }
}

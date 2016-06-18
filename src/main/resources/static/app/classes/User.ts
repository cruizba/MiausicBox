/**
 * Class that represent the information related to MiausicBox users
 * @class User
 */
import {Band} from './Band'
import {Instrument} from "./Instrument";
import {Genre} from "./Genre";

export class User{

  /* Attributes */
  private _id: number;
  private _userName: string;
  private _password: string;
  private _completeName: string;
  private _email: string;
  private _description: string;
  private _isArtist: boolean;
  private _city: string;
  private _facebook: string;
  private _twitter: string;
  private _youtube: string;
  private _instruments: Instrument[] = [];
  private _genres: Genre[] = [];
  private _bands: Band[] = [];
  private _events: Event[] = [];

  /* Constructor */
  constructor(id:number, userName:string, password:string, completeName:string,
              email:string, description:string, isArtist:boolean, city:string,
              facebook:string, twitter:string, youtube:string,
              instruments:Instrument[], genres:Genre[], bands: Band[], events: Event[]){
    this._id = id;
    this._userName = userName;
    this._password = password;
    this._completeName = completeName;
    this._email = email;
    this._description = description;
    this._isArtist = isArtist;
    this._city = city;
    this._facebook = facebook;
    this._twitter = twitter;
    this._youtube = youtube;
    this._instruments = instruments;
    this._genres = genres;
    this._bands = bands;
    this._events = events;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get userName():string {
    return this._userName;
  }

  get password():string {
    return this._password;
  }

  get completeName():string {
    return this._completeName;
  }

  get email():string {
    return this._email;
  }

  get description():string {
    return this._description;
  }

  get isArtist():boolean {
    return this._isArtist;
  }

  get instruments(): Instrument[] {
    return this._instruments;
  }

  get genres(): Genre[] {
    return this._genres;
  }

  get city():string {
    return this._city;
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

  get bands():Band[] {
    return this._bands;
  }

  get events():Event[] {
    return this._events;
  }

  set id(id:number) {
    this._id = id;
  }

  set instruments(instrument: Instrument[]) {
    this._instruments = instrument;
  }

  set genres(genres:Genre[]) {
    this._genres=genres;
  }

  set userName(userName: string) {
    this._userName = userName;
  }

  set password(password: string) {
    this._password = password;
  }

  set completeName(completeName: string) {
    this._completeName = completeName;
  }

  set email(email:string) {
    this._email = email;
  }

  set description(description: string) {
    this._description = description
  }

  set isArtist(isArtist:boolean) {
    this._isArtist = isArtist;
  }

  set city(city:string) {
    this._city = city;
  }

  set facebook(facebook:string) {
    this._facebook = facebook;
  }

  set twitter(twitter:string) {
    this._twitter = twitter;
  }

  set youtube(youtube:string) {
    this._youtube = youtube;
  }

  set bands(value:Band[]) {
    this._bands=value;
  }
  set events(value:Event[]) {
    this._events=value;
  }

  /** Return if an User is equal to other
    @method equals
    @param {User} User
  */
  equals(object:any) {
    if (!(object instanceof User)){
      return false;
    } else {
      var user:User = object;
      return (user.userName == this.userName);
    }
  }

}

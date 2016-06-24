/**
 *  Class that represent the information related to MiausicBox events
 *  @class Event
 */
import { User } from './User';
import {Band} from "./Band";

export class Event {

  /* Attributes */
  private _id:number;
  private _name:string;
  private _date:Date;
  private _creator:User;
  private _description:string;
  private _bands:Band[];
  private _direction:string;
  private _followers:User[];

  /* Constructor */
  constructor(id:number, name:string, date:Date, creator:User, description:string,
              bands:Band[], direction:string, followers:User[]) {
    this._id = id;
    this._name = name;
    this._date = date;
    this._creator = creator;
    this._description = description;
    this._bands = bands;
    this._direction=direction;
    this._followers=followers;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get name():string {
    return this._name;
  }

  get date():Date {
    return this._date;
  }

  get creator():User {
    return this._creator;
  }

  get description():string {
    return this._description;
  }

  get bands():Band[] {
    return this._bands;
  }

  get direction():string {
    return this._direction;
  }

  set id(id:number) {
    this._id = id;
  }

  set name(name:string) {
    this._name = name;
  }
  get followers():User[]{
    return this._followers;
  }

  set date(date:Date) {
    this._date = date;
  }

  set creator(creator:User) {
    this._creator = creator;
  }

  set description(description:string) {
    this._description = description;
  }

  set bands(value:Band[]){
    this._bands=value;
  }

  set direction(value:string){
    this._direction=value;
  }

  set followers(value:User[]){
    this._followers=value;
  }

  /** Return if an Event is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
    if (!(object instanceof Event)) {
      return false;
    } else {
      var event:Event = object;
      return (event.name == this.name &&
              event.date == this.date &&
              event.creator == this.creator);
    }
  }

  /** Return if Event has a Band
   *  @method hasBand
   *  @param {band} Band
   */
  hasBand(band:Band):boolean {
    var found = false;
    for (var i = 0; i < this.bands.length; i++) {
      if (this.bands[i].equals(band)) {
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

}

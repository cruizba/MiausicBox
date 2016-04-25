/**
 *  Class that represent the information related to MiausicBox users
 *  @class Event
 */
import { User } from './User';
import {Band} from "./Band";

export class Event {
 


  /* Attributes */
  private _name:string;
  private _date:Date;
  private _creator:User;
  private _description:string;
  private _bands:Band[];
  private _direction:string;

  /* Constructor */
  constructor(name:string, date:Date, creator:User, description:string, bands:Band[], direction:string) {
    this._name = name;
    this._date = date;
    this._creator = creator;
    this._description = description;
    this._bands = bands;
    this._direction=direction;
  }

  /* Getters & Setters */
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

  get bands():Band[]{
    return this._bands;
  }

  get direction():string{
    return this._direction;
  }

  set name(name:string) {
    this._name = name;
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

  /** Return if an Event is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Event)) {
      return false;
    } else {
      var event:Event = object;
      return (event.name == this.name &&
              event.date == this.date &&
              event.creator == this.creator);
    };
  }

}

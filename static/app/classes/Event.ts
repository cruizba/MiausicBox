/**
 *  Class that represent the information related to MiausicBox users
 *  @class Event
 */
import { User } from './User';

export class Event {

  /* Attributes */
  private _name:string;
  private _date:Date;
  private _creator:User;
  private _description:string;

  /* Constructor */
  constructor(name:string, date:Date, creator:User, description:string) {
    this._name = name;
    this._date = date;
    this._creator = creator;
    this._description = description;
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

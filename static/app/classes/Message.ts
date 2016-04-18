/**
 * Class that represent the information related to MiausicBox users
 * @class Message
 */
import { User } from './User';

export class Message {

  /* Attributes */
  private _sender:User;
  private _destiny:User;
  private _message:string;
  private _date:Date;
  private _instrument:string;

  /* Constructor */
  constructor(sender:User, destiny:User, message:string, date:Date, instrument:string) {
    this._sender = sender;
    this._destiny = sender;
    this._date = date;
    this._instrument = instrument;
  }

  /* Getters & Setters */
  get sender():User {
    return this._sender;
  }

  get destiny():User {
    return this._destiny;
  }

  get message():string {
    return this._message;
  }

  get dte():Date {
    return this._date;
  }

  get instrument():string {
    return this.instrument;
  }

  set sender(sender:User) {
    this._sender = sender;
  }

  set destiny(destiny:User) {
    this._destiny = destiny;
  }

  set message(message:string) {
    this._message = message;
  }

  set date(date:Date) {
    this._date = date;
  }

  set instrument(instrument:string) {
    this._instrument = instrument;
  }

  /** Return if an Message is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Message)) {
      return false;
    } else {
      var message:Message = object;
      return (message.sender == this.sender &&
              message.destiny == this.destiny &&
              message.date == this.date);
    }
  }

}

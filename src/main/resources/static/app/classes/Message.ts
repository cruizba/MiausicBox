/**
 * Class that represent the information related to MiausicBox users
 * @class Message
 */
import { User } from './User';

export class Message {


  /* Attributes */
  private _sender:User;
  private _destiny:User;
  private _subject: string;
  private _message:string;
  private _date:Date;
  private _read:boolean;

  /* Constructor */
  constructor(sender:User, destiny:User, subject:string, message:string, date:Date, read:boolean) {
    this._sender = sender;
    this._destiny = destiny;
    this._subject = subject;
    this._message = message;
    this._date = date;
    this._read = read;
  }

  /* Getters & Setters */
  get sender():User {
    return this._sender;
  }

  get destiny():User {
    return this._destiny;
  }

  get subject():string{
    return this._subject;
  }


  get message():string {
    return this._message;
  }

  get date():Date {
    return this._date;
  }

  get read():boolean{
    return this._read;
  }

  set sender(sender:User) {
    this._sender = sender;
  }

  set destiny(destiny:User) {
    this._destiny = destiny;
  }

  set subject(value:string){
    this._subject=value;
  }

  set message(message:string) {
    this._message = message;
  }

  set date(date:Date) {
    this._date = date;
  }

  set read(value:boolean){
    this._read=value;
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
      return (message.sender.equals(this.sender) &&
              message.destiny.equals(this.destiny) &&
              message.message == this.message);
    }
  }

}

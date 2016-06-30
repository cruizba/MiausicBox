/**
 * Class that represent the information related to MiausicBox messages
 * @class Message
 */
import { User } from './User';

export class Message {
  
  /* Attributes */
  private _id: number;
  private _sender: User;
  private _destiny: User;
  private _subject: string;
  private _message: string;
  private _date: Date;
  private _readd: boolean;

  /* Constructor */
  constructor(id:number, sender:User, destiny:User, subject:string, message:string, date:Date, readd:boolean) {
    this._id = id;
    this._sender = sender;
    this._destiny = destiny;
    this._subject = subject;
    this._message = message;
    this._date = date;
    this._readd = readd;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get sender():User {
    return this._sender;
  }

  get destiny():User {
    return this._destiny;
  }

  get subject():string {
    return this._subject;
  }


  get message():string {
    return this._message;
  }

  get date():Date {
    return this._date;
  }

  get readd():boolean {
    return this._readd;
  }

  set id(id:number) {
    this._id = id;
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

  set readd(value:boolean) {
    this._readd=value;
  }

  /** Return if an Message is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
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

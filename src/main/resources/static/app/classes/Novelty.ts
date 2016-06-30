/**
 * Class that represent the information related to MiausicBox novelties
 * @class Message
 */
import {Band} from "./Band";
import {User} from "./User";

export class Novelty{

  /* Attributes */
  private _id: number;
  private _user: User;
  private _band: Band;
  private _date: Date;
  private _joined: boolean

  /* Constructor */
  constructor(id:number, user:User, band: Band, date:Date, joined: boolean) {
    this._id = id;
    this._user = user;
    this._band = band;
    this._date = date;
    this._joined = joined;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get user():User {
    return this._user;
  }

  get band():Band {
    return this._band;
  }

  get date():Date {
    return this._date;
  }

  get joined():boolean {
    return this._joined;
  }

  set id(id:number) {
    this._id = id;
  }

  set user(user:User) {
    this._user = user;
  }

  set band(band:Band) {
    this._band =  band;
  }

  set date(date:Date) {
    this._date = date;
  }

  set joined(joined:boolean) {
    this._joined = joined;
  }

  /** Return if a Novelty is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
    if (!(object instanceof Novelty)) {
      return false;
    } else {
      var novelty:Novelty = object;
      return (novelty.user.equals(this.user) &&
              novelty.band.equals(this.band) &&
              novelty.joined == this.joined);
    }
  }

}

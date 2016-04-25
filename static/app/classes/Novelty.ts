import {Band} from "./Band";
import {User} from "./User";
export class Novelty{

  private _user: User;
  private _band: Band;
  private _date: Date;
  private _joined: boolean

  constructor(user:User, band: Band, date:Date, joined: boolean) {
    this._user = user;
    this._band = band;
    this._date = date;
    this._joined = joined;
  };

  public get user():User{
    return this._user;
  }

  public get band():Band{
    return this._band;
  }

  public get date():Date{
    return this._date;
  }

  public get joined():boolean {
    return this._joined;
  }

  public set user(user:User){
    this._user = user;
  }

  public set band(band:Band){
    this._band =  band;
  }

  public set date(date:Date){
    this._date = date;
  }

  public set joined(joined:boolean) {
    this._joined = joined;
  }

  /** Return if a Novelty is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Novelty)){
      return false;
    }
    else{
      var novelty:Novelty = object;
      return (novelty.user.equals(this.user) &&
              novelty.band.equals(this.band) &&
              novelty.joined ==  this.joined);
    }
  }

}

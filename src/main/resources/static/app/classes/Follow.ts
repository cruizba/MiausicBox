/**
 * Class that represent the information related to MiausicBox follows
 * @class Follow
 */
import { User } from './User';

export class Follow {

  /* Attributes */
  private _id:number;
  private _emisor:User;
  private _receptor:User;

  /* Constructor */
  constructor(id:number, emisor:User, receptor:User) {
    this._id = id;
    this._emisor = emisor;
    this._receptor = receptor;
  }

  /* Getters & Setters */
  get id():number {
    return this._id;
  }

  get emisor():User {
    return this._emisor;
  }

  get receptor():User {
    return this._receptor;
  }

  set id(id:number) {
    this._id = id;
  }

  set emisor(emisor:User) {
    this._emisor = emisor;
  }

  set receptor(receptor:User) {
    this._receptor = receptor;
  }

  /** Return if an Follow is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
    if (!(object instanceof Follow)) {
      return false;
    } else {
      var follow:Follow = object;
      return (follow.emisor.equals(this.emisor) &&
              follow.receptor.equals(this.receptor));
    }
  }

}

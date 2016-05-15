/**
 * Class that represent the information related to MiausicBox users
 * @class Follow
 */
import { User } from './User';

export class Follow {

  /* Attributes */
  private _emisor:User;
  private _receptor:User;

  /* Constructor */
  constructor(emisor:User, receptor:User) {
    this._emisor = emisor;
    this._receptor = receptor;
  }

  /* Getters & Setters */
  get emisor():User {
    return this._emisor;
  }

  get receptor():User {
    return this._receptor;
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
  equals(object:any){
    //At ApiRest object, this comparaison should be the with both ids
    if (!(object instanceof Follow)) {
      return false;
    } else {
      var follow:Follow = object;
      return (follow.emisor.equals(this.emisor) &&
              follow.receptor.equals(this.receptor));
    }
  }

}

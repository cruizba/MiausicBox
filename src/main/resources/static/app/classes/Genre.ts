/**
 * Class that represent the information related to MiausicBox genres
 * @class Follow
 */

export class Genre {

  /* Attributes */
  private _name: string;

  /* Constructor */
  constructor(name){
    this._name = name;
  }

  /* Getters & Setters */
  get name():string {
    return this._name;
  }

  set name(value:string) {
    this._name = value;
  }

  /** Return if an Follow is equal to other
   *  @method equals
   *  @param {object} object
   */
  equals(object:any) {
    if (!(object instanceof Genre)) {
      return false;
    } else {
      var genre:Genre = object;
      return (genre.name == this.name);
    }
  }

}
